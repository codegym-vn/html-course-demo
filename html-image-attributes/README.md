# Thuộc Tính Thẻ Hình Ảnh (&lt;img&gt;)

Ứng dụng tương tác trực quan hóa các thuộc tính cốt lõi của thẻ `<img>`: `src`, `alt`, `width`, `height`, và hiện tượng hiển thị khi ảnh bị lỗi đường dẫn.

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Thuộc tính `src` (Source)
- Đường dẫn tới file ảnh (URL tuyệt đối hoặc tương đối).
- Nếu đường dẫn sai hoặc ảnh bị xóa khỏi máy chủ, trình duyệt sẽ kích hoạt trạng thái ảnh lỗi.

### 1.2. Thuộc tính `alt` (Alternative Text)
- Văn bản thay thế mô tả nội dung bức ảnh.
- **Vai trò bắt buộc:**
  1. Hiển thị cho người dùng khi ảnh bị lỗi tải.
  2. Giúp công cụ đọc màn hình (Screen Reader) đọc cho người khiếm thị.
  3. Cung cấp dữ liệu để công cụ tìm kiếm Google lập chỉ mục (SEO).

### 1.3. Thuộc tính `width` và `height`
- Khai báo kích thước hiển thị của ảnh (đơn vị pixel).
- **Tránh Layout Shift (CLS):** Khai báo sẵn kích thước giúp trình duyệt dành sẵn không gian hiển thị trước khi tải xong ảnh, ngăn chặn hiện tượng nội dung văn bản bị nhảy giật đột ngột.

---

## 2. Hướng Dẫn Sử Dụng

1. Bấm nút **Mô phỏng ảnh hỏng** để quan sát cách trình duyệt sử dụng nội dung thuộc tính `alt` thay thế.
2. Tinh chỉnh thanh trượt **width** và **height** để xem ảnh co giãn trực tiếp trong bài viết mẫu.
3. Bấm **Copy** để lấy đoạn mã `<img ...>` chuẩn mực.

---

## 3. Cấu Trúc Thư Mục

```text
html-image-attributes/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giao diện và vùng preview bài viết
├── script.js      # Logic mô phỏng tải ảnh, lỗi alt và tính tỉ lệ
└── README.md      # Tóm tắt kiến thức
```
