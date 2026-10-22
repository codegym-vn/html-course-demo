/* Bài: Thẻ <title> – Tiêu đề trang  -> index.html?ex=title */
registerExample({
  id: "title",
  title: "Thẻ <title> – Tiêu đề trang",
  description: "Thẻ <title> đặt tiêu đề hiện trên tab trình duyệt và trong kết quả tìm kiếm. Mỗi trang có đúng 1 thẻ title, nằm trong head.",
  showFullCode: true,
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <!-- title: chữ hiện trên tab trình duyệt -->
    <title>Học HTML cơ bản</title>
</head>
<body>
    <p>Tiêu đề của trang: <b id="tieuDe"></b></p>

    <script>
        document.getElementById("tieuDe").textContent = document.title;
    </script>
</body>
</html>
`,
});
