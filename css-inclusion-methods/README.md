# Ba Cách Viết CSS (Inline, Internal, External)

Ứng dụng tương tác trực quan hóa cơ chế ưu tiên (Cascade) và sự cộng gộp thuộc tính khi kết hợp 3 phương thức khai báo CSS: Inline, Internal và External.

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Thứ tự ưu tiên ghi đè (Cascade Priority)
Khi nhiều nguồn CSS cùng tác động lên một thuộc tính (như `color`), nguồn có độ ưu tiên cao hơn sẽ ghi đè (override):
$$\text{Inline (Cao nhất)} > \text{Internal} = \text{External (Tùy thứ tự xuất hiện)}$$

- **1. Inline CSS (`style="..."`):** Viết trực tiếp trên thẻ HTML. Luôn chiến thắng các quy tắc bên ngoài.
- **2. Internal CSS (`<style>` trong `<head>`):** Quản lý tập trung trong file HTML hiện tại.
- **3. External CSS (file `.css` riêng):** Chuẩn chuyên nghiệp tốt nhất, tách biệt cấu trúc HTML và giao diện CSS.

### 1.2. Cơ chế cộng gộp thuộc tính (Property Merging)
Các thuộc tính **không xung đột** (như `font-weight` từ Inline, `text-decoration` từ Internal, `font-style` từ External) sẽ được trình duyệt gộp chung lại để cùng áp dụng lên phần tử.

---

## 2. Hướng Dẫn Sử Dụng

1. Bật/tắt các checkbox ở 3 nguồn CSS (Inline, Internal, External) để xem màu sắc nào chiến thắng.
2. Tắt **Inline CSS** để thấy **Internal CSS** lập tức được kích hoạt.
3. Quan sát mục **Các thuộc tính thực tế đang áp dụng** để hiểu bản chất cộng gộp thuộc tính của CSS.

---

## 3. Cấu Trúc Thư Mục

```text
css-inclusion-methods/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giao diện và thẻ switch
├── script.js      # Logic tính toán cascade và gộp thuộc tính
└── README.md      # Tóm tắt kiến thức
```
