/* Bài: Thẻ <figure> – Hình minh họa  -> index.html?ex=figure */
registerExample({
  id: "figure",
  title: "Thẻ <figure> – Hình minh họa",
  description: "Thẻ <figure> nhóm một ảnh (hoặc sơ đồ, đoạn mã) cùng chú thích của nó thành một khối độc lập.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ figure</title>
</head>
<body>
    <p>Vịnh Hạ Long là di sản thiên nhiên thế giới.</p>

    <figure>
        <img src="assets/images/ha-long-bay.jpg" alt="Thuyền buồm trên vịnh Hạ Long" width="280">
        <figcaption>Hình 1. Vịnh Hạ Long, Quảng Ninh</figcaption>
    </figure>
</body>
</html>
`,
});
