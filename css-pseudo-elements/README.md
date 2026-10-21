# Khảo Sát Phần Tử Giả Trong CSS (Pseudo-elements ::before & ::after)

Ứng dụng mô phỏng trực quan cơ chế tạo nội dung ảo trong CSS bằng `::before` và `::after`, đồng thời minh họa 4 trường hợp ứng dụng thực tế phổ biến trong lập trình giao diện.

## Bản chất phần tử giả

- **Vị trí trong DOM**:
  `::before` và `::after` không xuất hiện trong mã nguồn HTML mà được trình duyệt sinh ra tự động nằm *bên trong* phần tử mục tiêu (trước và sau nội dung thật).
- **Thuộc tính bắt buộc `content`**:
  Nếu không khai báo thuộc tính `content` (dù là chuỗi rỗng `content: ""`), phần tử giả sẽ **không được render**.
- **Kỹ thuật kết hợp định vị**:
  Thường kết hợp `position: relative` ở phần tử cha và `position: absolute` ở `::before`/`::after` để tạo huy hiệu (badge), icon, hoặc gạch chân trang trí.

## Cấu trúc thư mục

```text
css-pseudo-elements/
├── index.html     # Sơ đồ phân lớp DOM ảo và canvas render
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Đồng bộ use-case, bật/tắt pseudo-element và thuộc tính content
└── README.md      # Tài liệu hướng dẫn
```
