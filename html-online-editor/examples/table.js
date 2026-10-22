/* Bài: Thẻ <table> – Bảng  -> index.html?ex=table */
registerExample({
  id: "table",
  title: "Thẻ <table> – Bảng",
  description: "Thẻ <table> tạo bảng. Mỗi hàng là <tr>, mỗi ô là <td> (dữ liệu) hoặc <th> (tiêu đề).",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ table</title>
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
            <th>Họ tên</th>
            <th>Điểm</th>
        </tr>
        <tr>
            <td>An</td>
            <td>9</td>
        </tr>
        <tr>
            <td>Bình</td>
            <td>8</td>
        </tr>
    </table>
</body>
</html>
`,
});
