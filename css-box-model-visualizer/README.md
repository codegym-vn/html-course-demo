# Mô Hình Hộp CSS (Box Model Visualizer)

Ứng dụng mô phỏng trực quan 4 lớp cấu tạo nên mọi phần tử trên trang web theo chuẩn Chrome DevTools: Content, Padding, Border, Margin.

## Mục tiêu học tập

- Hiểu bản chất 4 lớp của Box Model:
  - **Content**: Vùng chứa văn bản, hình ảnh (`width`, `height`).
  - **Padding**: Khoảng đệm trong suốt nằm giữa nội dung và đường viền.
  - **Border**: Đường viền bao quanh vùng đệm và nội dung.
  - **Margin**: Khoảng cách bên ngoài đẩy các phần tử lân cận ra xa.
- Nắm vững công thức tính kích thước phần tử render và tổng diện tích chiếm dụng trong luồng tài liệu.

## Công thức tính không gian

Khi sử dụng `box-sizing: content-box` (mặc định):

- **Chiều rộng hiển thị thực tế (Rendered Width)**:
  `Rendered Width = width + (padding-left + padding-right) + (border-left-width + border-right-width)`
- **Tổng không gian chiếm dụng (Total Space)**:
  `Total Space = Rendered Width + (margin-left + margin-right)`

## Cấu trúc thư mục

```text
css-box-model-visualizer/
├── index.html     # Giao diện điều khiển và sơ đồ DevTools
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Đồng bộ slider, sơ đồ DevTools và render thực tế
└── README.md      # Tài liệu hướng dẫn
```
