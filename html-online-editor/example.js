/* ============================================================
   Thẻ ví dụ kiểu W3Schools (example.html?ex=<id>)
   - Hiện mô tả + đoạn mã ngắn đã tô màu
   - Nút "Thử ngay »" mở editor đầy đủ của bài (index.html?ex=<id>) ở tab mới
   - Gửi chiều cao thẻ cho trang LMS (postMessage) để trang cha có thể tự chỉnh chiều cao iframe
   ============================================================ */

const cardEl = document.getElementById('exampleCard');
const descriptionEl = document.getElementById('exampleDescription');
const codeEl = document.getElementById('exampleCode');
const codeBoxEl = document.getElementById('exampleCodeBox');
const tryLinkEl = document.getElementById('tryLink');
const overlayEl = document.getElementById('editorOverlay');
const editorFrameEl = document.getElementById('editorFrame');
let editorUrl = '';

/* ---------------- Mở editor toàn màn hình ----------------
   Fullscreen chỉ dùng được khi iframe LMS có allow="fullscreen" (hoặc khi mở trang trực tiếp).
   Không dùng được thì để link mở editor ở tab mới như W3Schools. */

function canFullscreen() {
  return Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);
}

function currentFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

/** Bấm Thử ngay: nạp editor vào lớp phủ rồi yêu cầu toàn màn hình (phải gọi ngay trong sự kiện click) */
function openEditorFullscreen(e) {
  if (!canFullscreen()) return; // để trình duyệt mở link ở tab mới
  e.preventDefault();

  // Giữ nguyên editor đã nạp để học viên mở lại vẫn còn mã đang sửa
  if (editorFrameEl.getAttribute('src') !== editorUrl) editorFrameEl.setAttribute('src', editorUrl);
  overlayEl.hidden = false;

  const request = overlayEl.requestFullscreen || overlayEl.webkitRequestFullscreen;
  const result = request.call(overlayEl);
  // Bị từ chối: lớp phủ vẫn che kín khung thẻ, nút Thoát trong editor vẫn đóng được
  if (result && result.catch) result.catch(() => {});
  editorFrameEl.focus();
}

/** Đóng editor: thoát toàn màn hình và ẩn lớp phủ */
function closeEditor() {
  if (currentFullscreenElement()) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }
  overlayEl.hidden = true;
  tryLinkEl.focus();
}

/** Người dùng nhấn Esc hoặc thoát toàn màn hình bằng cách khác: ẩn lớp phủ */
function handleFullscreenChange() {
  if (!currentFullscreenElement() && !overlayEl.hidden) closeEditor();
}

tryLinkEl.addEventListener('click', openEditorFullscreen);
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

// Nút Thoát trong editor gửi thông điệp này (chỉ nhận từ đúng iframe editor, cùng origin)
window.addEventListener('message', (e) => {
  if (e.source !== editorFrameEl.contentWindow || e.origin !== location.origin) return;
  if (e.data && e.data.type === 'html-editor:close') closeEditor();
});

/** Báo chiều cao nội dung cho trang nhúng (chỉ khi đang nằm trong iframe) */
function postHeight() {
  if (window.parent === window) return;
  window.parent.postMessage({
    type: 'html-example:height',
    id: getExampleIdFromUrl(),
    height: Math.ceil(document.documentElement.scrollHeight),
  }, '*');
}

/** Trạng thái lỗi: không có hoặc sai id bài */
function showCardError(id) {
  descriptionEl.textContent = id
    ? 'Không tìm thấy ví dụ "' + id + '".'
    : 'Thiếu tham số ?ex=<id>, ví dụ: example.html?ex=p';
  codeBoxEl.hidden = true;
  tryLinkEl.hidden = true;
}

/**
 * Chờ Tailwind browser CDN sinh CSS cho thẻ (nhận biết qua bo góc rounded-[5px] của thẻ).
 * Tối đa ~2 giây để thẻ không bị ẩn mãi nếu CDN lỗi.
 */
function waitForTailwind() {
  return new Promise((resolve) => {
    const start = performance.now();
    (function check() {
      const styled = getComputedStyle(cardEl).borderTopLeftRadius !== '0px';
      if (styled || performance.now() - start > 2000) resolve();
      else requestAnimationFrame(check);
    })();
  });
}

async function initCard() {
  const id = getExampleIdFromUrl();
  const example = id ? await loadExample(id) : null;

  if (!example) {
    showCardError(id);
  } else {
    document.title = 'Ví dụ: ' + example.title;
    descriptionEl.textContent = example.description || example.title;
    codeEl.innerHTML = highlightHtml(getSnippet(example)); // highlightHtml đã escape mã
    editorUrl = 'index.html?ex=' + encodeURIComponent(id) + '&mode=full';
    tryLinkEl.href = editorUrl;
    tryLinkEl.setAttribute('aria-label', 'Thử ngay ví dụ ' + example.title + ' trong trình soạn thảo toàn màn hình');
  }

  await waitForTailwind();
  // Font web (nhất là phần chữ có dấu tiếng Việt) chỉ tải khi có chữ dùng tới: chờ tải xong để chữ không đổi font
  if (document.fonts) {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  }
  cardEl.setAttribute('aria-busy', 'false');
  postHeight();
  if ('ResizeObserver' in window) new ResizeObserver(postHeight).observe(document.body);
}

initCard();
