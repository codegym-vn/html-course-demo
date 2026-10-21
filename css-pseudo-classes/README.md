# CSS Pseudo-Classes Lab (:hover, :focus, :nth-child)

Ứng dụng thử nghiệm trực tiếp ba nhóm lớp giả CSS. Mỗi lựa chọn chèn một quy tắc CSS thật vào trang, nên trình duyệt tự xử lý trạng thái `:hover`, `:focus`, `:nth-child()`. JavaScript chỉ đổi quy tắc CSS, không giả lập trạng thái chuột.

## 1. `:hover`

Bốn hiệu ứng để so sánh: nâng và phóng to, dịch sang phải, viền phát sáng, đổi màu nền và chữ. Chọn một kiểu rồi rê chuột vào nút xem trước.

## 2. `:focus` và `:focus-visible`

- Ba kiểu chỉ báo focus: focus ring, nhấn mạnh viền dưới, viền tương phản.
- Bật `:focus-visible` để thấy trình duyệt chỉ hiện chỉ báo khi điều hướng bằng bàn phím (phím Tab).
- Không nên bỏ `outline` nếu chưa có chỉ báo focus thay thế đủ rõ.

## 3. `:nth-child(an + b)`

Trình duyệt thay `n = 0, 1, 2, ...` vào `an + b`; chỉ các vị trí nguyên dương được chọn.

| Công thức | Vị trí được chọn (trong 12 phần tử) |
| :--- | :--- |
| `2n + 1` (odd) | 1, 3, 5, 7, 9, 11 |
| `2n` (even) | 2, 4, 6, 8, 10, 12 |
| `3n` | 3, 6, 9, 12 |
| `-n + 5` | 1, 2, 3, 4, 5 |
| `n + 6` | 6 đến 12 |
| `4` (a = 0) | 4 |

## Cấu trúc thư mục

```text
css-pseudo-classes/
├── index.html     # 3 tab: :hover, :focus, :nth-child()
├── style.css      # Định dạng chuẩn 600px cho LMS embed
├── script.js      # Chèn quy tắc CSS động, tính công thức an + b
└── README.md      # Tài liệu hướng dẫn
```
