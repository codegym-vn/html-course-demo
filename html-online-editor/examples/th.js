/* Bài: Thẻ <th> – Ô tiêu đề  -> index.html?ex=th */
registerExample({
  id: "th",
  title: "Thẻ <th> – Ô tiêu đề",
  tags: "scope",
  description: "Thẻ <th> là ô tiêu đề, mặc định chữ đậm và căn giữa. scope cho biết tiêu đề của cột (col) hay hàng (row).",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ th</title>
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
            <th scope="col">Thứ</th>
            <th scope="col">Môn học</th>
        </tr>
        <tr>
            <th scope="row">Thứ Hai</th>
            <td>HTML</td>
        </tr>
        <tr>
            <th scope="row">Thứ Ba</th>
            <td>CSS</td>
        </tr>
    </table>
</body>
</html>
`,
});
