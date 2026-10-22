/* Bài: Thẻ <thead> – Phần đầu bảng  -> index.html?ex=thead */
registerExample({
  id: "thead",
  title: "Thẻ <thead> – Phần đầu bảng",
  description: "Thẻ <thead> nhóm các hàng tiêu đề ở đầu bảng, tách biệt với phần dữ liệu <tbody>.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ thead</title>
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
        </tbody>
    </table>
</body>
</html>
`,
});
