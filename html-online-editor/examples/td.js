/* Bài: Thẻ <td> – Ô dữ liệu  -> index.html?ex=td */
registerExample({
  id: "td",
  title: "Thẻ <td> – Ô dữ liệu",
  tags: "colspan rowspan",
  description: "Thẻ <td> là ô dữ liệu. colspan gộp nhiều ô theo chiều ngang, rowspan gộp nhiều ô theo chiều dọc.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ td</title>
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
            <td>Ô thường</td>
            <td>Ô thường</td>
            <td rowspan="2">rowspan="2"</td>
        </tr>
        <tr>
            <td colspan="2">colspan="2"</td>
        </tr>
    </table>
</body>
</html>
`,
});
