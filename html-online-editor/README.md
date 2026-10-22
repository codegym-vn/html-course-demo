# Trình soạn thảo HTML trực tuyến

Viết mã HTML/CSS/JS ở panel trái (nền trắng, tô màu cú pháp), xem kết quả ngay ở panel phải (giống W3Schools Tryit Editor). Mã chạy trong iframe sandbox, tách biệt khỏi ứng dụng chính.

Một bộ mã mẫu dùng cho 2 trang, chọn bài bằng tham số `?ex=<id>`:

| Trang | Vai trò |
| :--- | :--- |
| `example.html?ex=<id>` | Thẻ ví dụ kiểu W3Schools: mô tả, đoạn mã ngắn có tô màu, nút **Thử ngay »**. Dùng để nhúng vào LMS |
| `index.html?ex=<id>` | Editor đầy đủ (mở ở tab mới khi bấm Thử ngay), nạp sẵn toàn bộ mã của bài |

## Danh sách bài (41 bài, mỗi thẻ 1 bài)

`id` bài là tên thẻ; riêng nhóm tiêu đề dùng `h1-h6`.

| Bài | Thẻ ví dụ (nhúng LMS) | Editor |
| :--- | :--- | :--- |
| `<html>` – Phần tử gốc | `example.html?ex=html` | `index.html?ex=html` |
| `<head>` – Thông tin trang | `example.html?ex=head` | `index.html?ex=head` |
| `<title>` – Tiêu đề trang | `example.html?ex=title` | `index.html?ex=title` |
| `<meta>` – Siêu dữ liệu | `example.html?ex=meta` | `index.html?ex=meta` |
| `<body>` – Nội dung trang | `example.html?ex=body` | `index.html?ex=body` |
| `<h1>` – `<h6>` – Tiêu đề | `example.html?ex=h1-h6` | `index.html?ex=h1-h6` |
| `<p>` – Đoạn văn | `example.html?ex=p` | `index.html?ex=p` |
| `<br>` – Xuống dòng | `example.html?ex=br` | `index.html?ex=br` |
| `<hr>` – Đường kẻ ngang | `example.html?ex=hr` | `index.html?ex=hr` |
| `<strong>` – Nội dung quan trọng | `example.html?ex=strong` | `index.html?ex=strong` |
| `<b>` – Chữ đậm | `example.html?ex=b` | `index.html?ex=b` |
| `<em>` – Nhấn giọng | `example.html?ex=em` | `index.html?ex=em` |
| `<i>` – Chữ nghiêng | `example.html?ex=i` | `index.html?ex=i` |
| `<u>` – Gạch chân | `example.html?ex=u` | `index.html?ex=u` |
| `<mark>` – Đánh dấu | `example.html?ex=mark` | `index.html?ex=mark` |
| `<small>` – Chữ nhỏ | `example.html?ex=small` | `index.html?ex=small` |
| `<del>` – Nội dung bị xóa | `example.html?ex=del` | `index.html?ex=del` |
| `<ins>` – Nội dung được thêm | `example.html?ex=ins` | `index.html?ex=ins` |
| `<sub>` – Chỉ số dưới | `example.html?ex=sub` | `index.html?ex=sub` |
| `<sup>` – Chỉ số trên | `example.html?ex=sup` | `index.html?ex=sup` |
| `<code>` – Đoạn mã | `example.html?ex=code` | `index.html?ex=code` |
| `<a>` – Liên kết | `example.html?ex=a` | `index.html?ex=a` |
| `<img>` – Hình ảnh | `example.html?ex=img` | `index.html?ex=img` |
| `<figure>` – Hình minh họa | `example.html?ex=figure` | `index.html?ex=figure` |
| `<figcaption>` – Chú thích hình | `example.html?ex=figcaption` | `index.html?ex=figcaption` |
| `<ul>` – Danh sách không thứ tự | `example.html?ex=ul` | `index.html?ex=ul` |
| `<ol>` – Danh sách có thứ tự | `example.html?ex=ol` | `index.html?ex=ol` |
| `<li>` – Mục danh sách | `example.html?ex=li` | `index.html?ex=li` |
| `<table>` – Bảng | `example.html?ex=table` | `index.html?ex=table` |
| `<caption>` – Tên bảng | `example.html?ex=caption` | `index.html?ex=caption` |
| `<thead>` – Phần đầu bảng | `example.html?ex=thead` | `index.html?ex=thead` |
| `<tbody>` – Phần thân bảng | `example.html?ex=tbody` | `index.html?ex=tbody` |
| `<tr>` – Hàng của bảng | `example.html?ex=tr` | `index.html?ex=tr` |
| `<th>` – Ô tiêu đề | `example.html?ex=th` | `index.html?ex=th` |
| `<td>` – Ô dữ liệu | `example.html?ex=td` | `index.html?ex=td` |
| `<form>` – Biểu mẫu | `example.html?ex=form` | `index.html?ex=form` |
| `<label>` – Nhãn ô nhập | `example.html?ex=label` | `index.html?ex=label` |
| `<input>` – Ô nhập liệu | `example.html?ex=input` | `index.html?ex=input` |
| `<button>` – Nút bấm | `example.html?ex=button` | `index.html?ex=button` |
| `<div>` – Khối chứa | `example.html?ex=div` | `index.html?ex=div` |
| `<span>` – Nội dòng | `example.html?ex=span` | `index.html?ex=span` |

- Không có `?ex=`: editor mở với cấu trúc HTML cơ bản; thẻ ví dụ báo thiếu tham số.
- Sai `?ex=`: editor vẫn mở với mã mặc định, header báo "Không tìm thấy bài"; thẻ ví dụ báo không tìm thấy.
- **Reset** khôi phục mã mẫu của bài đang mở.

## Nhúng vào LMS

Mỗi bài học nhúng thẻ ví dụ; học viên bấm **Thử ngay »** để mở editor **toàn màn hình** ngay trên trang bài học:

```html
<iframe src="https://<github-pages>/html-online-editor/example.html?ex=ul"
        width="100%" height="520" style="border:0"
        allow="fullscreen" allowfullscreen></iframe>
```

- `allow="fullscreen" allowfullscreen` là bắt buộc để mở toàn màn hình. Nếu LMS xóa thuộc tính này, nút Thử ngay tự chuyển sang mở editor ở tab mới (giống W3Schools).
- Thoát toàn màn hình: nút **Thoát** trên header editor hoặc phím `Esc`. Mở lại vẫn giữ mã học viên đang sửa (tới khi tải lại trang).
- Editor toàn màn hình là `index.html?ex=<id>&mode=full` (bỏ khung 600px, phủ kín cửa sổ).

- Chiều cao thẻ phụ thuộc độ dài đoạn mã (khoảng 180px + 24px mỗi dòng mã). Nếu LMS cho chèn script, đoạn sau tự chỉnh chiều cao theo nội dung:

  ```html
  <script>
    window.addEventListener('message', function (e) {
      if (!e.data || e.data.type !== 'html-example:height') return;
      document.querySelectorAll('iframe').forEach(function (f) {
        if (f.contentWindow === e.source) f.style.height = e.data.height + 'px';
      });
    });
  </script>
  ```

- Nếu LMS đặt `sandbox` cho iframe, cần có `allow-scripts allow-same-origin allow-popups` để thẻ và editor hoạt động.
- Có thể nhúng thẳng editor (`index.html?ex=...`, cao 600px) nếu muốn học viên sửa mã ngay trong bài.

## Thêm bài mới

1. Mỗi thẻ một bài. Tạo file `examples/<id>.js`, `id` là tên thẻ (chữ thường, số, dấu `-`) và trùng tên file:

   ```js
   /* Bài: Thẻ <blockquote>  -> index.html?ex=blockquote */
   registerExample({
     id: 'blockquote',
     title: 'Thẻ <blockquote> – Trích dẫn',
     tags: 'cite',
     description: 'Thẻ <blockquote> hiển thị một đoạn trích dẫn dài, thụt lề hai bên.',
     code: `<!DOCTYPE html>
   <html lang="vi">
   <head>
       <meta charset="UTF-8">
       <title>Trích dẫn</title>
   </head>
   <body>
       <blockquote>Học, học nữa, học mãi.</blockquote>
   </body>
   </html>
   `,
   });
   ```

2. Mở `example.html?ex=blockquote` và `index.html?ex=blockquote` để kiểm tra, rồi thêm một dòng vào bảng "Danh sách bài" ở trên.
3. Khi sửa một bài đã có, tăng `EXAMPLES_VERSION` trong `examples-loader.js` để trình duyệt không dùng bản cũ trong cache.

| Trường | Bắt buộc | Ý nghĩa |
| :--- | :---: | :--- |
| `id`, `title`, `code` | Có | Mã bài, tên bài (header editor), toàn bộ mã nạp vào editor |
| `description` | Nên có | Câu mô tả trên thẻ ví dụ |
| `tags` | Không | Thẻ minh họa, hiện cạnh tên bài trên editor |
| `snippet` | Không | Đoạn mã riêng cho thẻ ví dụ. Mặc định tự lấy khối `<style>` + nội dung `<body>` từ `code` |
| `showFullCode` | Không | `true`: thẻ ví dụ hiện toàn bộ `code` (dùng cho các bài html, head, title, meta, body) |

> Mã mẫu nằm trong chuỗi template `` `...` `` của JavaScript. Nếu mã mẫu có dấu `` ` `` hoặc `${`, viết thành `` \` `` và `\${`.

Ảnh dùng trong bài đặt ở `assets/images/` và gọi bằng đường dẫn tương đối, ví dụ `src="assets/images/ha-long-bay.jpg"`.

## Chức năng

| Chức năng | Cách dùng |
| :--- | :--- |
| Chạy mã | Nút **Run** hoặc `Ctrl+Enter` (`Cmd+Enter` trên macOS) |
| Tô màu cú pháp | Thẻ, thuộc tính, giá trị, chú thích HTML; selector/property/value trong `<style>`; từ khóa, chuỗi, số, hàm trong `<script>` (bảng màu kiểu W3Schools, dùng chung với thẻ ví dụ) |
| Auto-run | Bật mặc định; render sau 500ms kể từ lần gõ cuối |
| Reset | Khôi phục mã mẫu của bài sau khi xác nhận; giữ nguyên auto-run và kích thước panel |
| Chia panel | Kéo thanh giữa (chuột/cảm ứng), phím mũi tên ±5%, nhấp đúp về 50%; giới hạn 20% - 80% |
| Tab | Chèn 4 khoảng trắng. Nhấn `Esc` rồi `Tab` để rời editor |
| Trạng thái | `Ready` (xám), `Đang gõ...` (cam), `✓ Đã cập nhật` (xanh, 1.5 giây) kèm thời gian render |
| Responsive | Dưới 768px chuyển sang bố cục dọc (editor trên, preview dưới) |

## Bảo mật

- iframe dùng `sandbox="allow-scripts allow-modals allow-popups allow-popups-to-escape-sandbox"`, **không** có `allow-same-origin`: mã người dùng chạy ở origin riêng, không đọc/ghi được DOM, cookie, storage của trang cha. `alert()` vẫn hoạt động, link `target="_blank"` mở được tab mới.
- Không có `allow-forms`: form không gửi đi thật. Bài Biểu mẫu chặn `submit` bằng JS và hiện dữ liệu ngay trên trang.
- Mã được nạp qua thuộc tính `srcdoc` thay cho `contentDocument.write()`. Mỗi lần gán `srcdoc` tạo document mới hoàn toàn, không tích lũy listener/timer cũ.
- Khi render, editor chèn thêm một script nhỏ vào cuối mã để link neo `href="#id"` cuộn trong preview (trong `srcdoc`, link `#id` mặc định bị phân giải theo URL trang cha và tải lại cả editor vào iframe).
- Không lưu mã ra ngoài; tải lại trang sẽ mất mã.

## Cách tô màu (không dùng thư viện)

- Hai lớp chồng khít nhau: `<pre>` hiển thị mã đã tô màu nằm dưới, `<textarea>` chữ trong suốt nằm trên nhận thao tác gõ, chọn, copy/paste.
- Hai lớp dùng chung font, cỡ chữ, `line-height`, padding, `tab-size` nên con trỏ khớp với chữ màu; `<pre>` cuộn theo textarea.
- Mỗi lần gõ, `highlightHtml()` quét lại mã; nội dung `<style>` / `<script>` chuyển cho `highlightCss()` / `highlightJs()`. Mọi đoạn mã đều được escape trước khi gán `innerHTML`.

## Cấu trúc thư mục

```text
html-online-editor/
├── index.html          # Editor (Tailwind v4 browser CDN)
├── script.js           # Logic editor: runCode, resetCode, setupDivider, setupTabKey, nạp bài ?ex=
├── example.html        # Thẻ ví dụ kiểu W3Schools để nhúng LMS
├── example.js          # Logic thẻ: hiện đoạn mã, nút Thử ngay, báo chiều cao cho trang cha
├── highlight.js        # Dùng chung: tô màu HTML/CSS/JS (highlightHtml)
├── examples-loader.js  # Dùng chung: registerExample, loadExample, getSnippet
├── style.css           # Dùng chung: khung 600px, 2 lớp editor, thẻ ví dụ, màu token
├── examples/           # Mỗi bài 1 file <id>.js gọi registerExample()
│   ├── html.js
│   ├── p.js
│   └── ...
├── assets/images/      # Ảnh dùng trong mã mẫu
└── README.md
```
