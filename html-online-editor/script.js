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
 * Trong srcdoc, link href="#id" bị phân giải theo URL trang cha và làm iframe tải lại cả editor;
 * script này chặn lại và cuộn tới phần tử đích như trang thật.
 */
const PREVIEW_HELPER = '\n<script>document.addEventListener("click",function(e){' +
  'var a=e.target.closest&&e.target.closest("a[href^=\'#\']");if(!a||e.defaultPrevented)return;' +
  'e.preventDefault();var id=decodeURIComponent(a.getAttribute("href").slice(1));' +
  'var t=id&&(document.getElementById(id)||document.getElementsByName(id)[0]);' +
  'if(t)t.scrollIntoView();else if(!id)window.scrollTo(0,0);});<\/script>';

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

/**
 * Tab chèn 4 khoảng trắng tại con trỏ (thay thế vùng chọn nếu có).
 * Nhấn Esc trước Tab để chuyển focus ra ngoài như bình thường (tránh bẫy bàn phím).
 * Shift+Tab giữ hành vi mặc định.
 */
function setupTabKey() {
  let escapeArmed = false;

  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      escapeArmed = true;
      return;
    }
    if (e.key !== 'Tab' || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
      escapeArmed = false;
      return;
    }
    if (escapeArmed) {
      escapeArmed = false;
      return; // để trình duyệt chuyển focus
    }

    e.preventDefault();
    // execCommand giữ lịch sử Undo; nếu không hỗ trợ thì chèn trực tiếp
    const inserted = document.execCommand && document.execCommand('insertText', false, TAB_SPACES);
    if (!inserted) {
      editor.setRangeText(TAB_SPACES, editor.selectionStart, editor.selectionEnd, 'end');
      editor.dispatchEvent(new Event('input', { bubbles: true }));
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

  setupTabKey();
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
