/* Bài: Thẻ <form> – Biểu mẫu  -> index.html?ex=form */
registerExample({
  id: "form",
  title: "Thẻ <form> – Biểu mẫu",
  description: "Thẻ <form> nhóm các ô nhập liệu để gửi đi. Ví dụ dùng JavaScript chặn việc gửi để hiện dữ liệu ngay trên trang.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ form</title>
</head>
<body>
    <form id="dangKy">
        <p>
            <label for="ten">Họ tên:</label>
            <input type="text" id="ten" name="ten" required>
        </p>
        <button type="submit">Gửi</button>
    </form>

    <p id="ketQua"></p>

    <script>
        document.getElementById("dangKy").addEventListener("submit", function (e) {
            e.preventDefault();
            const ten = new FormData(this).get("ten");
            document.getElementById("ketQua").textContent = "Đã nhận: " + ten;
        });
    </script>
</body>
</html>
`,
});
