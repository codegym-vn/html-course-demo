# Khảo Sát Thuộc Tính Display (block, inline, inline-block)

Ứng dụng mô phỏng trực quan sự khác biệt cốt lõi về luồng hiển thị (document flow), khả năng tùy biến kích thước (`width`, `height`) và khoảng cách `margin` giữa ba giá trị kinh điển của thuộc tính `display`.

## Bảng so sánh đặc tính

| Giá trị Display | Xuống dòng mới (Line break)? | Nhận `width` / `height`? | Hiệu lực `margin-top` / `margin-bottom`? | Trường hợp sử dụng phổ biến |
| :--- | :--- | :--- | :--- | :--- |
| **`inline`** | Không (Nằm chung hàng) | Bị bỏ qua | Bị bỏ qua | Nhấn mạnh từ trong đoạn (`span`, `strong`, `em`, `a`) |
| **`block`** | Có (Chiếm trọn bề ngang) | Đầy đủ hiệu lực | Đầy đủ hiệu lực | Khung bố cục, đoạn văn, tiêu đề (`div`, `p`, `h1`-`h6`, `section`) |
| **`inline-block`** | Không (Nằm chung hàng) | Đầy đủ hiệu lực | Đầy đủ hiệu lực | Nút bấm (`button`), thanh điều hướng (navbar items), thẻ badge |

## Cấu trúc thư mục

```text
css-display-modes/
├── index.html     # Giao diện điều khiển display và luồng tài liệu
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Xử lý tương tác chuyển đổi chế độ và cập nhật trạng thái
└── README.md      # Tài liệu hướng dẫn
```
