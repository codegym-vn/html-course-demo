/* Bài: Thẻ <tbody> – Phần thân bảng  -> index.html?ex=tbody */
registerExample({
  id: "tbody",
  title: "Thẻ <tbody> – Phần thân bảng",
  description: "Thẻ <tbody> nhóm các hàng dữ liệu chính của bảng, nằm sau <thead>.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ tbody</title>
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
        <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Bút</td>
                <td>5.000đ</td>
            </tr>
            <tr>
                <td>Vở</td>
                <td>12.000đ</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`,
});
