# Chuẩn CSS: Tailwind CSS v4 (browser CDN)

Áp dụng cho mọi ứng dụng mới hoặc được thiết kế lại trong repo này. Quy tắc này thay thế chỉ dẫn mặc định "dùng Vanilla CSS".

- Nạp Tailwind v4 qua `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`, không có bước build.
- Token (font, màu tùy biến) khai báo trong `<style type="text/tailwindcss">@theme { ... }</style>`. Font: Plus Jakarta Sans (sans), JetBrains Mono (mono).
- Giao diện viết bằng utility class trong HTML. JS điều khiển trạng thái qua `aria-*` / `data-*` + variant Tailwind (`aria-pressed:`, `data-[x=true]:`, `group-*`, `peer-*`).
- `style.css` chỉ giữ phần tối thiểu: `html { font-size: 15px }`, khung `.app { height: 600px; max-height: 600px }`, và quy tắc demo cần CSS thật. Cấm reset `* { margin:0; padding:0 }` (CSS ngoài layer đè utility).
- Link `style.css?v=N` và `script.js?v=N`; tăng N mỗi lần sửa để tránh cache GitHub Pages/LMS.
- Vẫn giữ các ràng buộc chung: iframe 600px không thanh cuộn ngoài, không emoji/icon AI, nội dung ngắn gọn kỹ thuật, UI tiếng Việt, code box không bị cắt (`flex-1 min-h-0` cho stage, `shrink-0` cho code box), cấu trúc 4 file, cập nhật README gốc, commit + push sau mỗi thay đổi.
- Phần CSS mà bài học đang dạy (VD: `position`, `display`) phải được áp dụng bằng CSS thật lên phần tử demo (inline style hoặc rule chèn động), không giả lập bằng JS.
