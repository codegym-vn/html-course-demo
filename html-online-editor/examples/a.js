/* Bài: Thẻ <a> – Liên kết  -> index.html?ex=a */
registerExample({
  id: "a",
  title: "Thẻ <a> – Liên kết",
  tags: "href target",
  description: "Thẻ <a> tạo liên kết. href là địa chỉ đích: trang khác, phần tử có id (#id), email (mailto:) hoặc số điện thoại (tel:).",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ a</title>
</head>
<body>
    <!-- target="_blank": mở ở tab mới -->
    <p><a href="https://developer.mozilla.org/vi/" target="_blank" rel="noopener">Tài liệu MDN</a></p>

    <p><a href="#lien-he">Xuống phần Liên hệ</a></p>
    <p><a href="mailto:hocvien@example.com">Gửi email</a></p>

    <h2 id="lien-he" style="margin-top: 600px;">Liên hệ</h2>
    <p><a href="#">Lên đầu trang</a></p>
</body>
</html>
`,
});
