/* Bài: Thẻ <meta> – Siêu dữ liệu  -> index.html?ex=meta */
registerExample({
  id: "meta",
  title: "Thẻ <meta> – Siêu dữ liệu",
  tags: "charset name content",
  description: "Thẻ <meta> khai báo thông tin cho trình duyệt và công cụ tìm kiếm: bảng mã, cách hiển thị trên điện thoại, mô tả trang.",
  showFullCode: true,
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <!-- Bảng mã UTF-8: hiển thị đúng tiếng Việt -->
    <meta charset="UTF-8">
    <!-- Hiển thị vừa màn hình điện thoại -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Mô tả ngắn hiện trong kết quả tìm kiếm -->
    <meta name="description" content="Bài học về thẻ meta trong HTML">
    <title>Thẻ meta</title>
</head>
<body>
    <p>Thẻ meta không hiển thị trên trang. Nhờ charset UTF-8, chữ có dấu hiện đúng: Tiếng Việt.</p>
</body>
</html>
`,
});
