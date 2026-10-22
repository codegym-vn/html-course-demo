/* Bài: Thẻ <input> – Ô nhập liệu  -> index.html?ex=input */
registerExample({
  id: "input",
  title: "Thẻ <input> – Ô nhập liệu",
  tags: "type",
  description: "Thẻ <input> tạo ô nhập liệu; thuộc tính type quyết định kiểu ô: chữ, mật khẩu, số, ngày, checkbox, radio...",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ input</title>
</head>
<body>
    <p>text: <input type="text" placeholder="Nhập tên"></p>
    <p>password: <input type="password"></p>
    <p>number: <input type="number" min="1" max="10"></p>
    <p>date: <input type="date"></p>
    <p>checkbox: <input type="checkbox" checked></p>
    <p>radio: <input type="radio" name="gt" checked> Nam <input type="radio" name="gt"> Nữ</p>
    <p>color: <input type="color" value="#04AA6D"></p>
</body>
</html>
`,
});
