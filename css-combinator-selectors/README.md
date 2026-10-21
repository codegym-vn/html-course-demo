# Khảo Sát Bộ Chọn Kết Hợp Trong CSS (Combinator Selectors)

Ứng dụng mô phỏng trực quan 4 loại bộ chọn kết hợp kinh điển trong CSS, giúp học viên phân biệt chính xác quan hệ huyết thống và quan hệ cùng cấp trong cây phân cấp DOM.

## 4 Loại Bộ Chọn Kết Hợp

| Ký hiệu | Tên gọi (Tiếng Anh) | Cú pháp mẫu | Phạm vi ảnh hưởng |
| :---: | :--- | :--- | :--- |
| ` ` *(khoảng trắng)* | **Descendant** (Hậu duệ) | `A B` | Chọn **tất cả** các thẻ `B` nằm bên trong `A` (bao gồm con F1, cháu F2, chắt F3,...). |
| `>` | **Child** (Con trực tiếp) | `A > B` | Chỉ chọn các thẻ `B` là **con trực tiếp** (cấp F1) của `A`. Bỏ qua các cấp cháu chắt. |
| `+` | **Adjacent Sibling** (Liền kề) | `A + B` | Chỉ chọn **đúng duy nhất một** thẻ `B` nằm ngay sát phía sau `A` và có chung thẻ cha. |
| `~` | **General Sibling** (Anh em chung) | `A ~ B` | Chọn **tất cả** các thẻ `B` có cùng cha và đứng phía sau `A` (không cần phải đứng liền kề sát nhau). |

## Cấu trúc thư mục

```text
css-combinator-selectors/
├── index.html     # Cấu trúc DOM Tree trực quan
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Đồng bộ trạng thái khớp (match) và giải thích nguyên lý
└── README.md      # Tài liệu hướng dẫn
```
