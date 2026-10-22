/* ============================================================
   Bộ nạp bài mẫu, dùng chung cho editor (index.html) và thẻ ví dụ (example.html)
   ============================================================ */

/* ---------------- Bài mẫu (?ex=<id>) ----------------
   Mỗi bài là 1 file examples/<id>.js gọi registerExample({ id, title, tags, code }).
   Nạp bằng thẻ <script> nên chạy được cả khi mở file:// trực tiếp (fetch thì không). */

const EXAMPLES_VERSION = 3;     // Tăng khi sửa file trong examples/ để tránh cache
const exampleRegistry = {};

/** Được gọi từ mỗi file examples/<id>.js */
window.registerExample = function registerExample(example) {
  exampleRegistry[example.id] = example;
};

/**
 * Nạp file bài mẫu theo id. Trả về object bài hoặc null nếu id sai / file không tồn tại.
 * Chỉ nhận id dạng kebab-case để không nạp được file ngoài thư mục examples/.
 */
function loadExample(id) {
  return new Promise((resolve) => {
    if (!/^[a-z0-9-]+$/.test(id)) { resolve(null); return; }
    const script = document.createElement('script');
    script.src = 'examples/' + id + '.js?v=' + EXAMPLES_VERSION;
    script.onload = () => resolve(exampleRegistry[id] || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

/** Lấy id bài từ tham số ?ex= trên URL */
function getExampleIdFromUrl() {
  return new URLSearchParams(location.search).get('ex');
}

/** Bỏ dòng trống đầu/cuối và phần thụt lề chung của mọi dòng */
function dedent(text) {
  const lines = text.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join('\n');
}

/**
 * Đoạn mã ngắn hiển thị trên thẻ ví dụ (kiểu W3Schools).
 * Mặc định: khối <style> trong head (nếu có) + nội dung bên trong <body>.
 * Bài có thể ghi đè bằng snippet: '...' hoặc showFullCode: true.
 */
function getSnippet(example) {
  if (example.snippet) return dedent(example.snippet);
  if (example.showFullCode) return example.code.trim();

  const code = example.code;
  const parts = [];
  const style = code.match(/^([ \t]*<style[\s\S]*?<\/style>)/im);
  const body = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (style) parts.push(dedent(style[1]));
  if (body) parts.push(dedent(body[1]));
  return parts.length ? parts.join('\n\n') : code.trim();
}
