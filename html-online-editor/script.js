/* ============================================================
   Trình soạn thảo HTML trực tuyến
   - Editor: textarea thuần (Tab = 4 khoảng trắng, Ctrl+Enter = chạy)
   - Preview: iframe sandbox, nạp qua srcdoc
   - Auto-run debounce 500ms, divider kéo 20% - 80%
   - Bài mẫu: index.html?ex=<id> nạp examples/<id>.js
   ============================================================ */

/** Mã mặc định khi không có ?ex= hoặc không tìm thấy bài */
const defaultCode = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Trang của tôi</title>
</head>
<body>
    <h1>Xin chào HTML!</h1>
    <p>Đây là đoạn văn đầu tiên.</p>
</body>
</html>
`;

const DEBOUNCE_MS = 500;        // FR-04: thời gian chờ sau lần gõ cuối
const SUCCESS_SHOW_MS = 1500;   // FR-03: thời gian hiện "Đã cập nhật"
const MIN_SIZE = 20;            // FR-06: giới hạn tỷ lệ mỗi bên (%)
const MAX_SIZE = 80;
const TAB_SPACES = '    ';      // FR-01: Tab = 4 khoảng trắng

const editor = document.getElementById('codeEditor');
const previewFrame = document.getElementById('previewFrame');
const container = document.getElementById('container');
const divider = document.getElementById('divider');
const autoRunInput = document.getElementById('autoRun');
const statusEl = document.getElementById('status');
const statusText = document.getElementById('statusText');
const renderTimeEl = document.getElementById('renderTime');
const btnRun = document.getElementById('btnRun');
const btnReset = document.getElementById('btnReset');

/** Bố cục dọc (mobile) khi viewport < 768px */
const mobileQuery = window.matchMedia('(max-width: 767.98px)');

let autoRunEnabled = autoRunInput.checked;
let debounceTimer = null;
let statusTimer = null;
let isDragging = false;
let editorSize = 50;            // % kích thước editor theo trục hiện tại
let renderStart = 0;
let lastRunCode = null;
let initialCode = defaultCode;  // Mã của bài hiện tại, dùng khi Reset

/** Hiển thị tên bài trên header và tab trình duyệt */
function showLesson(example) {
  document.getElementById('lessonTitle').textContent = example.title;
  document.getElementById('lessonTags').textContent = example.tags || '';
  document.title = example.title + ' - Trình soạn thảo HTML';
}

/** Báo không tìm thấy bài (vẫn mở editor với mã mặc định) */
function showLessonNotice(id) {
  const notice = document.getElementById('lessonNotice');
  notice.textContent = 'Không tìm thấy bài "' + id + '", đang dùng mã mặc định';
  notice.hidden = false;
}

/**
 * Chèn vào cuối mã khi render (không hiện trong editor).
 * - Link href="#id": trong srcdoc bị phân giải theo URL trang cha và làm iframe tải lại cả editor;
 *   script chặn lại và cuộn tới phần tử đích như trang thật.
 * - Gửi form: trình duyệt vẫn kiểm tra required/type như thật, sau đó script chặn việc gửi
 *   (tránh tải trang khác vào preview) và hiện dữ liệu name = value sẽ được gửi đi.
 * Mã của học viên tự gọi preventDefault() thì script bỏ qua.
 */
const PREVIEW_HELPER = '\n<script>document.addEventListener("click",function(e){' +
  'var a=e.target.closest&&e.target.closest("a[href^=\'#\']");if(!a||e.defaultPrevented)return;' +
  'e.preventDefault();var id=decodeURIComponent(a.getAttribute("href").slice(1));' +
  'var t=id&&(document.getElementById(id)||document.getElementsByName(id)[0]);' +
  'if(t)t.scrollIntoView();else if(!id)window.scrollTo(0,0);});' +
  'document.addEventListener("submit",function(e){if(e.defaultPrevented)return;e.preventDefault();' +
  'var d=new FormData(e.target,e.submitter||undefined),r=[];d.forEach(function(v,k){r.push(k+" = "+(v&&v.name!==undefined?v.name:v));});' +
  'alert("Dữ liệu form gửi đi:\\n\\n"+(r.length?r.join("\\n"):"(trống: các ô cần có thuộc tính name)"));});<\/script>';

/* ---------------- Tô màu cú pháp ----------------
   Textarea trong suốt nằm trên <pre>; mỗi lần gõ dựng lại HTML màu cho <pre> bằng highlightHtml() (highlight.js). */

const highlightLayer = document.getElementById('highlightLayer');
const highlightCode = document.getElementById('highlightCode');

/** Dựng lại lớp màu theo nội dung editor. Thêm '\n' để dòng trống cuối vẫn có chiều cao */
function updateHighlight() {
  highlightCode.innerHTML = highlightHtml(editor.value) + '\n';
  syncScroll();
}

/** Lớp màu cuộn theo textarea */
function syncScroll() {
  highlightLayer.scrollTop = editor.scrollTop;
  highlightLayer.scrollLeft = editor.scrollLeft;
}

/* ---------------- Trạng thái (FR-07) ---------------- */

/**
 * Đặt trạng thái hiển thị ở góc phải panel preview.
 * @param {'ready'|'typing'|'success'} state
 */
function setStatus(state) {
  const labels = { ready: 'Ready', typing: 'Đang gõ...', success: '✓ Đã cập nhật' };
  clearTimeout(statusTimer);
  statusEl.dataset.state = state;
  statusText.textContent = labels[state];

  if (state === 'success') {
    statusTimer = setTimeout(() => setStatus('ready'), SUCCESS_SHOW_MS);
  }
}

/* ---------------- Render (FR-02, FR-03) ---------------- */

/**
 * Render mã hiện tại vào iframe.
 * Gán srcdoc tạo một document mới hoàn toàn mỗi lần (không tích lũy listener/timer cũ).
 * iframe không có allow-same-origin nên trang cha không thể ghi trực tiếp vào contentDocument.
 */
function runCode() {
  clearTimeout(debounceTimer);
  lastRunCode = editor.value;
  renderStart = performance.now();
  previewFrame.srcdoc = editor.value + PREVIEW_HELPER;
}

/** Khi iframe nạp xong: đo thời gian render và báo thành công */
previewFrame.addEventListener('load', () => {
  if (!renderStart) return;
  const ms = Math.round(performance.now() - renderStart);
  renderStart = 0;
  renderTimeEl.textContent = ms + ' ms';
  setStatus('success');
});

/* ---------------- Auto-run (FR-04) ---------------- */

/** Mỗi lần gõ: nếu bật auto-run thì hiện "Đang gõ..." và đặt lại bộ đếm debounce */
function handleInput() {
  if (!autoRunEnabled) return;
  setStatus('typing');
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(runCode, DEBOUNCE_MS);
}

/** Bật/tắt auto-run. Khi bật lại mà mã đã đổi thì chạy ngay để đồng bộ */
function handleAutoRunToggle() {
  autoRunEnabled = autoRunInput.checked;
  if (!autoRunEnabled) {
    clearTimeout(debounceTimer);
    if (statusEl.dataset.state === 'typing') setStatus('ready');
  } else if (editor.value !== lastRunCode) {
    runCode();
  }
}

/* ---------------- Reset (FR-05) ---------------- */

/** Khôi phục mã mẫu của bài hiện tại sau khi xác nhận. Không đổi auto-run hay kích thước panel */
function resetCode() {
  if (!confirm('Khôi phục mã mẫu ban đầu? Mã hiện tại sẽ bị mất.')) return;
  setEditorCode(initialCode);
}

/** Đặt nội dung editor, tô màu và chạy ngay */
function setEditorCode(code) {
  editor.value = code;
  editor.scrollTop = 0;
  editor.scrollLeft = 0;
  editor.setSelectionRange(0, 0);
  updateHighlight();
  runCode();
}

/* ---------------- Phím tắt (FR-01) ---------------- */

/** Thay đoạn [start, end) bằng text. execCommand giữ lịch sử Undo; nếu không hỗ trợ thì chèn trực tiếp */
function replaceRange(start, end, text) {
  editor.setSelectionRange(start, end);
  const inserted = document.execCommand && document.execCommand('insertText', false, text);
  if (!inserted) {
    editor.setRangeText(text, start, end, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

/**
 * Thụt lề (Tab) hoặc lùi lề (Shift+Tab) mọi dòng nằm trong vùng chọn, giữ nguyên vùng chọn trên các dòng đó.
 * Vùng chọn kết thúc ở đầu dòng thì không tính dòng đó (giống VS Code).
 */
function indentLines(outdent) {
  const value = editor.value;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const lastPos = end > start && value[end - 1] === '\n' ? end - 1 : end;
  const blockStart = value.lastIndexOf('\n', start - 1) + 1;
  let blockEnd = value.indexOf('\n', lastPos);
  if (blockEnd === -1) blockEnd = value.length;

  const lines = value.slice(blockStart, blockEnd).split('\n');
  const changed = lines.map((line) => {
    if (outdent) return line.replace(/^( {1,4}|\t)/, '');
    return line ? TAB_SPACES + line : line; // không thêm khoảng trắng vào dòng trống
  });
  const block = changed.join('\n');
  if (block === lines.join('\n')) return;

  const firstDelta = changed[0].length - lines[0].length;
  const totalDelta = block.length - (blockEnd - blockStart);
  replaceRange(blockStart, blockEnd, block);
  const newStart = Math.max(blockStart, start + firstDelta);
  editor.setSelectionRange(newStart, Math.max(newStart, end + totalDelta));
}

/**
 * Phím soạn thảo:
 * - Tab: chèn 4 khoảng trắng tại con trỏ; chọn nhiều dòng thì thụt lề cả khối
 * - Shift+Tab: lùi lề dòng hiện tại / các dòng đang chọn
 * - Enter: xuống dòng và giữ thụt lề của dòng trên
 * Nhấn Esc trước Tab / Shift+Tab để chuyển focus ra ngoài như bình thường (tránh bẫy bàn phím).
 */
function setupEditorKeys() {
  let escapeArmed = false;

  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      escapeArmed = true;
      return;
    }
    const armed = escapeArmed;
    escapeArmed = false;
    if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing) return;

    if (e.key === 'Tab') {
      if (armed) return; // để trình duyệt chuyển focus
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = editor;
      if (e.shiftKey || value.slice(selectionStart, selectionEnd).includes('\n')) {
        indentLines(e.shiftKey);
      } else {
        replaceRange(selectionStart, selectionEnd, TAB_SPACES);
      }
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      const { selectionStart, selectionEnd, value } = editor;
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const indent = value.slice(lineStart, selectionStart).match(/^[ \t]*/)[0];
      if (!indent) return; // không thụt lề: để trình duyệt xuống dòng như thường
      e.preventDefault();
      replaceRange(selectionStart, selectionEnd, '\n' + indent);
    }
  });

  editor.addEventListener('blur', () => { escapeArmed = false; });
}

/** Ctrl+Enter (hoặc Cmd+Enter trên macOS) chạy mã ở bất kỳ đâu trong ứng dụng */
function setupRunShortcut() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  });
}

/* ---------------- Divider (FR-06) ---------------- */

/** Áp dụng tỷ lệ editor đã giới hạn trong 20% - 80% */
function applyEditorSize(percent) {
  editorSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, percent));
  container.style.setProperty('--editor-size', editorSize + '%');
  divider.setAttribute('aria-valuenow', String(Math.round(editorSize)));
}

/** Tính tỷ lệ editor từ vị trí con trỏ so với container (ngang hoặc dọc tùy bố cục) */
function sizeFromPointer(clientX, clientY) {
  const rect = container.getBoundingClientRect();
  return mobileQuery.matches
    ? ((clientY - rect.top) / rect.height) * 100
    : ((clientX - rect.left) / rect.width) * 100;
}

/**
 * Kéo divider bằng Pointer Events (chuột + cảm ứng + bút).
 * setPointerCapture giữ sự kiện kể cả khi con trỏ đi qua iframe.
 * Phím mũi tên đổi 5% mỗi lần, Home/End nhảy tới giới hạn.
 */
function setupDivider() {
  const stopDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    divider.dataset.dragging = 'false';
    document.body.classList.remove('is-resizing', 'is-vertical');
    if (divider.hasPointerCapture(e.pointerId)) divider.releasePointerCapture(e.pointerId);
  };

  divider.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    isDragging = true;
    divider.dataset.dragging = 'true';
    divider.setPointerCapture(e.pointerId);
    document.body.classList.add('is-resizing');
    document.body.classList.toggle('is-vertical', mobileQuery.matches);
  });

  divider.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    applyEditorSize(sizeFromPointer(e.clientX, e.clientY));
  });

  divider.addEventListener('pointerup', stopDrag);
  divider.addEventListener('pointercancel', stopDrag);

  divider.addEventListener('keydown', (e) => {
    const step = { ArrowLeft: -5, ArrowUp: -5, ArrowRight: 5, ArrowDown: 5 }[e.key];
    if (step) applyEditorSize(editorSize + step);
    else if (e.key === 'Home') applyEditorSize(MIN_SIZE);
    else if (e.key === 'End') applyEditorSize(MAX_SIZE);
    else return;
    e.preventDefault();
  });

  divider.addEventListener('dblclick', () => applyEditorSize(50));
}

/* ---------------- Chế độ toàn màn hình (?mode=full) ---------------- */

/**
 * Editor phủ kín màn hình. Khi nằm trong thẻ ví dụ (example.html), hiện nút Thoát;
 * bấm Thoát gửi thông điệp để thẻ ví dụ thoát toàn màn hình và đóng editor.
 */
function setupFullMode() {
  if (new URLSearchParams(location.search).get('mode') !== 'full') return;
  document.documentElement.dataset.mode = 'full';

  if (window.parent === window) return; // mở ở tab riêng: không cần nút Thoát
  const btnExit = document.getElementById('btnExitFull');
  btnExit.hidden = false;
  document.getElementById('escHint').innerHTML = '<kbd class="font-mono">Esc</kbd> đóng editor';
  btnExit.addEventListener('click', () => {
    window.parent.postMessage({ type: 'html-editor:close' }, location.origin === 'null' ? '*' : location.origin);
  });
}

/* ---------------- Khởi tạo ---------------- */

async function init() {
  setupFullMode();
  applyEditorSize(50);

  editor.addEventListener('input', () => {
    updateHighlight();   // tô màu ngay mỗi lần gõ, không phụ thuộc auto-run
    handleInput();
  });
  editor.addEventListener('scroll', syncScroll);
  autoRunInput.addEventListener('change', handleAutoRunToggle);
  btnRun.addEventListener('click', runCode);
  btnReset.addEventListener('click', resetCode);

  setupEditorKeys();
  setupRunShortcut();
  setupDivider();

  // Nạp bài theo ?ex=<id>; không có hoặc sai id thì dùng mã mặc định
  const exampleId = getExampleIdFromUrl();
  if (exampleId) {
    editor.readOnly = true;
    const example = await loadExample(exampleId);
    editor.readOnly = false;
    if (example) {
      initialCode = example.code;
      showLesson(example);
    } else {
      showLessonNotice(exampleId);
    }
  }

  setEditorCode(initialCode); // TC-01: hiển thị preview mã mẫu ngay khi mở
}

init();
