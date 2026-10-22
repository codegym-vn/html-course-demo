/* Bài: Thẻ <head> – Thông tin trang  -> index.html?ex=head */
registerExample({
  id: "head",
  title: "Thẻ <head> – Thông tin trang",
  description: "Thẻ <head> chứa thông tin về trang như tiêu đề, bảng mã, CSS. Nội dung trong head không hiển thị trên trang.",
  showFullCode: true,
  code: `<!DOCTYPE html>
<html lang="vi">
<!-- head: thông tin cho trình duyệt, không hiển thị -->
<head>
    <meta charset="UTF-8">
    <title>Thẻ head</title>
    <style>
        p { color: #04AA6D; }
    </style>
</head>
<body>
    <p>Màu xanh của dòng này được khai báo trong head.</p>
</body>
</html>
`,
});
