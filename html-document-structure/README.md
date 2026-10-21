# Cấu Trúc Tài Liệu HTML

Ứng dụng tương tác trực quan hóa các thành phần cốt lõi của một trang web HTML5 chuẩn: `<!DOCTYPE>`, `<html>`, `<head>`, `<meta>`, `<title>`, `<body>`.

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Khai báo `<!DOCTYPE html>`
- Luôn là dòng đầu tiên của file HTML.
- Thông báo cho trình duyệt tuân thủ chuẩn HTML5 hiện đại nhất, tránh rơi vào Quirks Mode (chế độ tương thích cũ).

### 1.2. Thẻ gốc `<html>` và thuộc tính `lang`
- Bao bọc toàn bộ mã nguồn của trang web.
- `lang="vi"` giúp công cụ tìm kiếm và trình đọc màn hình nhận diện ngôn ngữ chính xác.

### 1.3. Thẻ `<head>`: Vùng thông tin ngầm (Metadata)
- Không hiển thị trực tiếp trong trang trắng.
- `<meta charset="UTF-8">`: Bắt buộc để hiển thị đúng dấu tiếng Việt.
- `<title>`: Tiêu đề hiển thị trên thanh tab trình duyệt và kết quả tìm kiếm Google.

### 1.4. Thẻ `<body>`: Vùng hiển thị trực quan
- Nơi chứa mọi nội dung người dùng tương tác: tiêu đề (`<h1>`), đoạn văn (`<p>`), hình ảnh, nút bấm,...

---

## 2. Hướng Dẫn Sử Dụng

1. Bấm vào từng dòng mã nguồn ở cột trái để xem giải thích vai trò của thẻ tương ứng.
2. Nhập tiêu đề mới vào ô `<title>` để thấy tab trình duyệt ở cột phải thay đổi trực tiếp.
3. Nhập tiêu đề mới vào ô `<h1>` để thấy nội dung render bên trong khung trắng `<body>`.

---

## 3. Cấu Trúc Thư Mục

```text
html-document-structure/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giao diện trình duyệt mô phỏng
├── script.js      # Logic tương tác và đồng bộ
└── README.md      # Tóm tắt kiến thức
```
