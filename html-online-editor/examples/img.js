/* Bài: Thẻ <img> – Hình ảnh  -> index.html?ex=img */
registerExample({
  id: "img",
  title: "Thẻ <img> – Hình ảnh",
  tags: "src alt width",
  description: "Thẻ <img> chèn ảnh. src là đường dẫn ảnh, alt là mô tả hiện ra khi ảnh lỗi và cho trình đọc màn hình. Đây là thẻ rỗng.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ img</title>
</head>
<body>
    <img src="assets/images/ha-long-bay.jpg" alt="Vịnh Hạ Long" width="320">

    <!-- Sai đường dẫn: trình duyệt hiện chữ trong alt -->
    <p><img src="anh-khong-ton-tai.jpg" alt="Ảnh bị lỗi đường dẫn"></p>
</body>
</html>
`,
});
