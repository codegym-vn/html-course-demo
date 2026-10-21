# Khảo Sát Thuộc Tính Position Trong CSS (static, relative, absolute, fixed)

Ứng dụng mô phỏng trực quan 4 giá trị định vị 2D cơ bản trong CSS, giúp học viên hiểu rõ cơ chế nhấc khỏi luồng tự nhiên và cách xác định mốc tọa độ (Containing Block).

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
├── index.html     # Khung nhìn cuộn giả lập và bảng điều khiển tọa độ
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Xử lý tương tác dịch chuyển tọa độ và mô phỏng Viewport
└── README.md      # Tài liệu hướng dẫn
```
