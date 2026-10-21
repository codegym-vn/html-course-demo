# Thẻ Liên Kết Trong HTML (&lt;a&gt;)

Ứng dụng tương tác trực quan hóa cơ chế hoạt động của thẻ siêu liên kết `<a>`: liên kết ngoài, liên kết neo cuộn trang nội bộ (`#id`), giao thức `mailto:`, `tel:`, thuộc tính `target` và tiêu chuẩn bảo mật `rel="noopener noreferrer"`.

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Thuộc tính `href` (Hypertext Reference)
- Điểm đến của liên kết:
  - **URL tuyệt đối:** `https://domain.com` (chuyển sang website khác).
  - **Liên kết neo (#id):** Nhảy/cuộn trực tiếp đến phần tử có `id` tương ứng trong cùng một trang tài liệu.
  - **`mailto:email@domain.com`:** Mở ứng dụng gửi email mặc định.
  - **`tel:+84...`:** Kích hoạt ứng dụng quay số trên thiết bị di động.

### 1.2. Thuộc tính `target`
- `_self` (Mặc định): Mở trang mới ngay tại tab hiện tại.
- `_blank`: Mở trang mới trong một tab hoặc cửa sổ trình duyệt độc lập.

### 1.3. Bảo mật với `rel="noopener noreferrer"`
- Bắt buộc đi kèm khi sử dụng `target="_blank"`:
  - `noopener`: Ngăn trang mới truy cập đối tượng `window.opener` của trang gốc (chống tấn công Tab-nabbing / Phishing).
  - `noreferrer`: Không gửi thông tin tiêu đề HTTP Referer sang máy chủ trang đích.

---

## 2. Hướng Dẫn Sử Dụng

1. Chọn **Loại liên kết** ở cột trái (Liên kết ngoài, Neo trong trang `#id`, Email, Điện thoại).
2. Bấm trực tiếp vào đường link hiển thị trong khung trình duyệt mô phỏng ở cột phải để quan sát phản hồi:
   - Với liên kết neo: Trang tự động cuộn mượt xuống vùng đích chứa `id="sectionContact"`.
   - Với `target="_blank"`: Thanh tab trình duyệt mô phỏng sẽ bật mở một tab mới.
3. Bấm **Copy** để lấy đoạn mã `<a ...>` chuẩn cú pháp.

---

## 3. Cấu Trúc Thư Mục

```text
html-anchor-links/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giao diện và mô phỏng tab trình duyệt
├── script.js      # Logic cuộn neo #id và mô phỏng mở tab
└── README.md      # Tóm tắt kiến thức
```
