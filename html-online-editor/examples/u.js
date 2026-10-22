/* Bài: Thẻ <u> – Gạch chân  -> index.html?ex=u */
registerExample({
  id: "u",
  title: "Thẻ <u> – Gạch chân",
  description: "Thẻ <u> gạch chân chữ để đánh dấu chữ khác thường, như từ viết sai chính tả. Không dùng <u> chỉ để trang trí vì dễ nhầm với liên kết.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ u</title>
</head>
<body>
    <p>Chữ thường.</p>

    <!-- Đánh dấu từ viết sai chính tả -->
    <p>Câu này có lỗi: Tôi đi <u>hoc</u> lúc 7 giờ.</p>

    <!-- Gạch chân trông giống liên kết, dễ gây nhầm -->
    <p><u>Chữ gạch chân</u> và <a href="#">liên kết</a> trông gần giống nhau.</p>
</body>
</html>
`,
});
