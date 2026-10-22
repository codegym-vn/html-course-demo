/* Bài: Thẻ <tr> – Hàng của bảng  -> index.html?ex=tr */
registerExample({
  id: "tr",
  title: "Thẻ <tr> – Hàng của bảng",
  description: "Thẻ <tr> tạo một hàng trong bảng; bên trong chứa các ô <th> hoặc <td>.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ tr</title>
    <style>
        /* Bảng mặc định không có viền, thêm viền để dễ nhìn */
        table, th, td {
            border: 1px solid #999;
            border-collapse: collapse;
            padding: 6px 12px;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td>Hàng 1, ô 1</td>
            <td>Hàng 1, ô 2</td>
        </tr>
        <tr>
            <td>Hàng 2, ô 1</td>
            <td>Hàng 2, ô 2</td>
        </tr>
    </table>
</body>
</html>
`,
});
