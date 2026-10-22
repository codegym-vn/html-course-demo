/* Bài: Thẻ <span> – Nội dòng  -> index.html?ex=span */
registerExample({
  id: "span",
  title: "Thẻ <span> – Nội dòng",
  description: "Thẻ <span> là phần tử nội dòng: chỉ rộng bằng nội dung, nằm cùng dòng chữ. Dùng để định dạng một phần đoạn văn.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ span</title>
    <style>
        span { background: #fde68a; }
        .gia { color: #c00; font-weight: bold; }
    </style>
</head>
<body>
    <p>Học <span>HTML</span> và <span>CSS</span> để làm web.</p>
    <p>Giá chỉ <span class="gia">199.000đ</span></p>
</body>
</html>
`,
});
