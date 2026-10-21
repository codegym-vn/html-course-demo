# Giải Phẫu Cú Pháp CSS: selector { property: value; }

Ứng dụng tương tác mổ xẻ cấu trúc của một quy tắc CSS chuẩn và mô phỏng các lỗi cú pháp kinh điển (quên dấu `;`, sai chính tả thuộc tính).

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Cấu trúc một quy tắc CSS (CSS Rule Set)
```css
selector {
  property: value;
}
```
1. **Selector (Bộ chọn):** Chỉ định phần tử HTML nào sẽ được áp dụng (ví dụ: `.btn`).
2. **Khối khai báo (Declaration Block):** Nằm trọn bên trong cặp dấu ngoặc nhọn `{ ... }`.
3. **Property (Thuộc tính):** Đặc tính muốn thay đổi (ví dụ: `color`, `background-color`).
4. **Dấu hai chấm (`:`):** Ngăn cách giữa thuộc tính và giá trị.
5. **Value (Giá trị):** Cách thuộc tính đó được định kiểu (ví dụ: `#ffffff`, `20px`).
6. **Dấu chấm phẩy (`;`):** Bắt buộc dùng để kết thúc một câu khai báo.

### 1.2. Hai cạm bẫy cú pháp phổ biến
- **Quên dấu chấm phẩy (`;`):** Trình duyệt không biết điểm dừng của thuộc tính đầu tiên nên sẽ gộp cả 2 dòng khai báo lại với nhau thành giá trị vô hiệu, dẫn đến **hỏng cả hai thuộc tính**.
- **Sai chính tả thuộc tính:** Trình duyệt tự động bỏ qua thuộc tính không hợp lệ mà không làm hỏng các thuộc tính khác trong cùng khối.

---

## 2. Hướng Dẫn Sử Dụng

1. Bấm vào các nút mô phỏng: **Chuẩn cú pháp**, **Quên dấu chấm phẩy (;)**, **Sai tên thuộc tính**.
2. Quan sát sự thay đổi màu sắc và trạng thái của nút bấm ở cột phải.
3. Đọc phần **Phân tích cú pháp** để hiểu cơ chế xử lý lỗi của trình duyệt.

---

## 3. Cấu Trúc Thư Mục

```text
css-syntax-anatomy/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giải phẫu token và nút bấm
├── script.js      # Logic mô phỏng các tình huống cú pháp
└── README.md      # Tóm tắt kiến thức
```
