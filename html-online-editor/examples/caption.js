/* Bài: Thẻ <caption> – Tên bảng  -> index.html?ex=caption */
registerExample({
  id: "caption",
  title: "Thẻ <caption> – Tên bảng",
  description: "Thẻ <caption> đặt tên cho bảng, phải là thẻ con đầu tiên của <table>.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ caption</title>
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
        <caption>Bảng điểm lớp 10A</caption>
        <tr>
            <th>Họ tên</th>
            <th>Điểm</th>
        </tr>
        <tr>
            <td>An</td>
            <td>9</td>
        </tr>
    </table>
</body>
</html>
`,
});
