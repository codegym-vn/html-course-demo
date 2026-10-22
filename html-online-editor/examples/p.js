/* Bài: Thẻ <p> – Đoạn văn  -> index.html?ex=p */
registerExample({
  id: "p",
  title: "Thẻ <p> – Đoạn văn",
  description: "Thẻ <p> tạo một đoạn văn, tự cách đoạn trên và dưới. Nhiều khoảng trắng hoặc xuống dòng trong code chỉ hiện thành 1 khoảng trắng.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ p</title>
</head>
<body>
    <p>Đây là đoạn văn thứ nhất.</p>
    <p>Đây là đoạn văn thứ hai.</p>

    <p>Chữ     cách     xa
       và xuống dòng trong code.</p>
</body>
</html>
`,
});
