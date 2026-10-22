/* Bài: Thẻ <form> – Biểu mẫu  -> index.html?ex=form */
registerExample({
  id: "form",
  title: "Thẻ <form> – Biểu mẫu",
  tags: "action method",
  description: "Thẻ <form> nhóm các ô nhập liệu để gửi đi. Khi bấm Gửi, dữ liệu của các ô có thuộc tính name được gửi tới địa chỉ trong action.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ form</title>
</head>
<body>
    <form action="/dang-ky" method="post">
        <p>
            <label for="ten">Họ tên:</label>
            <input type="text" id="ten" name="ten" required>
        </p>
        <p>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
        </p>
        <button type="submit">Gửi</button>
    </form>
</body>
</html>
`,
});
