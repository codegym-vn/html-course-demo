# Xuống dòng trong Flexbox: flex-wrap và align-content

Ứng dụng cho thấy cách item xuống dòng (`flex-wrap`) và cách các dòng flex được phân bổ theo trục phụ (`align-content`). Các dòng flex được phát hiện từ vị trí thật của item và vẽ thành dải màu vàng.

## Nội dung tương tác

| Thuộc tính | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` | `nowrap`: item bị co (đo được độ rộng thật nhỏ hơn 90px) |
| `align-content` | `normal`, `flex-start`, `center`, `flex-end`, `space-between`, `space-around` | Chỉ có tác dụng khi container nhiều dòng (`flex-wrap` khác `nowrap`) |

- Thanh trượt chiều rộng container và số item để tạo nhiều dòng.
- Item không đặt `height`, nên khi `align-content: normal` (giãn dòng) item giãn theo dòng, thấy rõ chiều cao dòng.
- Số đo: số dòng flex và độ rộng thật của item.

## Cấu trúc thư mục

```text
flexbox-wrap-align-content/
├── index.html     # Giao diện Tailwind v4 (browser CDN)
├── style.css      # Quy tắc nền 600px, item, dải dòng flex
├── script.js      # Áp dụng CSS thật, phát hiện và vẽ dòng flex
└── README.md
```
