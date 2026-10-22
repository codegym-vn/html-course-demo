/* Bài: Thẻ <div> – Khối chứa  -> index.html?ex=div */
registerExample({
  id: "div",
  title: "Thẻ <div> – Khối chứa",
  description: "Thẻ <div> là phần tử khối: chiếm hết chiều ngang và luôn xuống dòng. Dùng để nhóm các phần tử lại với nhau.",
  code: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thẻ div</title>
    <style>
        div { background: #dbeafe; padding: 8px; margin: 6px 0; }
    </style>
</head>
<body>
    <div>Khối div thứ nhất</div>
    <div>Khối div thứ hai</div>

    <div>
        <h3>Thẻ sản phẩm</h3>
        <p>Giá: 199.000đ</p>
    </div>
</body>
</html>
`,
});
