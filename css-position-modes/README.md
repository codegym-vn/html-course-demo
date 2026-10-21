# Khảo Sát Thuộc Tính Position Trong CSS (static, relative, absolute, fixed)

Ứng dụng mô phỏng trực quan 4 giá trị định vị 2D cơ bản trong CSS, giúp học viên hiểu rõ cơ chế nhấc khỏi luồng tự nhiên và cách xác định mốc tọa độ (Containing Block).

## Ghi chú kỹ thuật

- Giao diện dùng Tailwind CSS v4 qua `@tailwindcss/browser@4` (không cần build).
- Khung bên phải có `transform: translateZ(0)` nên trở thành khối chứa của `position: fixed`, mô phỏng viewport bằng CSS thật.
- Viền vàng đánh dấu mốc tọa độ (containing block) của chế độ đang chọn.

## Bảng so sánh 4 chế độ Position

| Giá trị | Còn chiếm chỗ trong luồng? | Mốc tính tọa độ (`top`, `left`,...)? | Cuộn theo trang? |
| :--- | :---: | :--- | :---: |
| **`static`** | Có | Bị bỏ qua hoàn toàn | Có |
| **`relative`** | Có *(giữ chỗ gốc)* | Tính từ chính **vị trí gốc ban đầu** của phần tử | Có |
| **`absolute`** | Không *(bị nhấc ra)* | Thẻ tổ tiên gần nhất có `position` khác `static` | Có |
| **`fixed`** | Không *(bị nhấc ra)* | Khung nhìn trình duyệt (**Viewport**) | Không *(ghim cố định)* |

## Cấu trúc thư mục

```text
css-position-modes/
├── index.html     # Giao diện dựng bằng Tailwind CSS v4 (browser CDN)
├── style.css      # Quy tắc nền: khung 600px, transform tạo khối chứa cho fixed
├── script.js      # Đổi position/offset, tô viền mốc tọa độ, sinh code CSS
└── README.md      # Tài liệu hướng dẫn
```
