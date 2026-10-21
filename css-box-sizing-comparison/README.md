# So Sánh Box-Sizing (content-box vs border-box)

Ứng dụng so sánh tương tác giữa hai mô hình tính toán kích thước hộp trong CSS: `box-sizing: content-box` (mặc định) và `box-sizing: border-box` (tiêu chuẩn hiện đại).

## Vấn đề cốt lõi

- **`content-box` (Mặc định)**:
  - Thuộc tính `width` và `height` chỉ gán kích thước cho vùng nội dung (Content).
  - Khi thêm `padding` hoặc `border`, kích thước ngoài thực tế của phần tử sẽ bị cộng dồn, làm hộp phình to hơn con số khai báo ban đầu.
  - Đây là nguyên nhân hàng đầu khiến giao diện bị tràn khung (overflow) hoặc vỡ layout lưới (grid/flex).

- **`border-box` (Chuẩn hiện đại)**:
  - Thuộc tính `width` và `height` bao trùm toàn bộ: Content + Padding + Border.
  - Khi tăng `padding` hoặc `border`, phần ruột nội dung tự động thu hẹp lại để đảm bảo kích thước tổng thể luôn cố định đúng bằng giá trị đã khai báo.

## Cấu hình khuyến nghị toàn cục (CSS Reset)

Để tránh hiện tượng vỡ layout trên toàn bộ dự án, tiêu chuẩn công nghiệp luôn áp dụng quy tắc sau ngay đầu file CSS:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

## Cấu trúc thư mục

```text
css-box-sizing-comparison/
├── index.html     # Giao diện so sánh song song với vạch định mức
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Đồng bộ slider và tính toán công thức phình kích thước
└── README.md      # Tài liệu hướng dẫn
```
