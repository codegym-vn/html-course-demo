/* Bài: Thẻ <label> – Nhãn ô nhập  -> index.html?ex=label */
registerExample({
  id: "label",
  title: "Thẻ <label> – Nhãn ô nhập",
  tags: "for",
  description: "Thẻ <label> gắn chữ mô tả cho ô nhập. for trùng id của ô nhập: bấm vào chữ sẽ chọn ô đó.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ label</title>
</head>
<body>
    <!-- Cách 1: for trùng id -->
    <p>
        <label for="email">Email:</label>
        <input type="email" id="email">
    </p>

    <!-- Cách 2: bọc ô nhập bên trong label -->
    <p>
        <label><input type="checkbox"> Ghi nhớ đăng nhập</label>
    </p>
</body>
</html>
`,
});
