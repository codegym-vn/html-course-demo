# Bộ Chọn CSS Cơ Bản (Element, Class, ID)

Ứng dụng tương tác trực quan hóa cách CSS nhắm mục tiêu phần tử trên trang web và cơ chế tính thang điểm ưu tiên (Specificity).

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Bộ chọn theo Thẻ (Element Selector)
- Cú pháp: Tên thẻ trực tiếp (`p`, `h3`, `button`).
- Tác động: Toàn bộ các thẻ cùng tên trên trang.
- Điểm ưu tiên: **1 điểm**.

### 1.2. Bộ chọn theo Lớp (Class Selector)
- Cú pháp: Có dấu chấm phía trước (`.card`, `.highlight`, `.badge`).
- Tác động: Mọi phần tử có thuộc tính `class="..."` tương ứng.
- Tính chất: Linh hoạt, tái sử dụng nhiều lần cho các phần tử khác nhau.
- Điểm ưu tiên: **10 điểm**.

### 1.3. Bộ chọn theo Định Danh (ID Selector)
- Cú pháp: Có dấu thăng phía trước (`#featured`, `#btnSubmit`).
- Tác động: Phần tử duy nhất có `id="..."` trên trang.
- Tính chất: Không được đặt trùng lặp ID trong cùng một tài liệu HTML.
- Điểm ưu tiên: **100 điểm** (áp đảo thẻ và class thông thường).

---

## 2. Hướng Dẫn Sử Dụng

1. Bấm vào các nút bộ chọn mẫu (`p`, `.card`, `#featured`, `p.highlight`) hoặc tự gõ vào ô selector.
2. Quan sát các phần tử tương ứng ở cột phải phát sáng viền xanh.
3. Theo dõi bảng **Điểm ưu tiên (Specificity)** để thấy cách trình duyệt phân định quyền ưu tiên giữa Element, Class và ID.

---

## 3. Cấu Trúc Thư Mục

```text
css-basic-selectors/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giao diện và hiệu ứng phát sáng
├── script.js      # Logic phân tích selector và tính điểm specificity
└── README.md      # Tóm tắt kiến thức
```
