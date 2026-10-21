# Khảo Sát Lớp Giả Trong CSS (Pseudo-classes)

Ứng dụng mô phỏng trực quan các trạng thái tương tác người dùng (`:hover`, `:focus`, `:active`) và quy luật toán học chọn phần tử cấu trúc (`:nth-child`).

## 1. Lớp giả tương tác người dùng

- **`:hover`**: Kích hoạt khi con trỏ chuột di chuyển vào phần tử (đổi màu, hiệu ứng nổi).
- **`:focus`**: Kích hoạt khi phần tử nhận tiêu điểm (nhấp chuột vào ô input hoặc phím Tab bàn phím).
- **`:active`**: Kích hoạt trong khoảnh khắc người dùng nhấn giữ chuột trái (hiệu ứng nút bấm lún xuống).

## 2. Lớp giả cấu trúc `:nth-child(An + B)`

Trình duyệt thay lần lượt các số tự nhiên không âm `n = 0, 1, 2, 3,...` vào biểu thức `An + B` để tìm số thứ tự phần tử cần chọn:

- **`odd`**: Các số lẻ (`1, 3, 5, 7, 9,...`) - tương đương `2n + 1`.
- **`even`**: Các số chẵn (`2, 4, 6, 8, 10,...`) - tương đương `2n`.
- **`3n`**: Bội số của 3 (`3, 6, 9,...`).
- **`n + 4`**: Chọn từ phần tử thứ 4 trở đi (`4, 5, 6, 7,...`).

## Cấu trúc thư mục

```text
css-pseudo-classes/
├── index.html     # Giao diện 2 tab (Tương tác và Cấu trúc)
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Xử lý chuyển tab, mô phỏng trạng thái và giải mã nth-child
└── README.md      # Tài liệu hướng dẫn
```
