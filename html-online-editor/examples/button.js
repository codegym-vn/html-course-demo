/* Bài: Thẻ <button> – Nút bấm  -> index.html?ex=button */
registerExample({
  id: "button",
  title: "Thẻ <button> – Nút bấm",
  tags: "type",
  description: "Thẻ <button> tạo nút bấm. type=\"button\" là nút thường (dùng với JavaScript), type=\"submit\" gửi form, type=\"reset\" xóa form.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ button</title>
</head>
<body>
    <button type="button" onclick="dem()">Bấm vào tôi</button>
    <p id="ketQua">Chưa bấm lần nào</p>

    <script>
        let soLan = 0;
        function dem() {
            soLan++;
            document.getElementById("ketQua").textContent = "Đã bấm " + soLan + " lần";
        }
    </script>
</body>
</html>
`,
});
