/* Bài: Thẻ <figcaption> – Chú thích hình  -> index.html?ex=figcaption */
registerExample({
  id: "figcaption",
  title: "Thẻ <figcaption> – Chú thích hình",
  description: "Thẻ <figcaption> là chú thích của <figure>, đặt ở đầu hoặc cuối figure.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ figcaption</title>
</head>
<body>
    <figure>
        <figcaption>Chú thích đặt phía trên ảnh</figcaption>
        <img src="assets/images/ha-long-bay.jpg" alt="Vịnh Hạ Long" width="240">
    </figure>

    <figure>
        <img src="assets/images/ha-long-bay.jpg" alt="Vịnh Hạ Long" width="240">
        <figcaption>Chú thích đặt phía dưới ảnh</figcaption>
    </figure>
</body>
</html>
`,
});
