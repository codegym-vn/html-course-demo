/* Bài: Thẻ <li> – Mục danh sách  -> index.html?ex=li */
registerExample({
  id: "li",
  title: "Thẻ <li> – Mục danh sách",
  description: "Thẻ <li> là một mục trong <ul> hoặc <ol>. Đặt ul/ol bên trong li để tạo danh sách lồng nhau.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ li</title>
</head>
<body>
    <ul>
        <li>Frontend
            <ol>
                <li>HTML</li>
                <li>CSS</li>
            </ol>
        </li>
        <li>Backend</li>
    </ul>
</body>
</html>
`,
});
