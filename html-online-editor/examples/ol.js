/* Bài: Thẻ <ol> – Danh sách có thứ tự  -> index.html?ex=ol */
registerExample({
  id: "ol",
  title: "Thẻ <ol> – Danh sách có thứ tự",
  tags: "type start",
  description: "Thẻ <ol> tạo danh sách đánh số. type đổi kiểu đánh số (1, A, a, I, i), start bắt đầu từ số khác.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ ol</title>
</head>
<body>
    <ol>
        <li>Vo gạo</li>
        <li>Cho nước</li>
        <li>Bấm nút nấu</li>
    </ol>

    <ol type="A" start="3">
        <li>Bắt đầu từ C</li>
        <li>Tiếp theo là D</li>
    </ol>
</body>
</html>
`,
});
