# Sắp xếp thứ tự Item với order

Ứng dụng cho tăng/giảm `order` của 5 flex item (A–E) và so sánh 3 loại thứ tự: thứ tự trong HTML, thứ tự hiển thị (đo từ vị trí thật) và thứ tự phím Tab.

## Quy tắc

- Mặc định mọi item có `order: 0`.
- Item xếp theo `order` tăng dần; giá trị âm đứng trước item mặc định.
- Cùng giá trị `order` thì giữ thứ tự trong HTML.
- `order` chỉ đổi thứ tự hiển thị: phím Tab và trình đọc màn hình vẫn đi theo thứ tự HTML. Không dùng `order` để sắp xếp nội dung có ý nghĩa.

## Mẫu nhanh

| Mẫu | CSS |
| :--- | :--- |
| Đưa C lên đầu | `.item-c { order: -1; }` |
| Đẩy A xuống cuối | `.item-a { order: 1; }` |
| Đảo ngược | A–E: `order` 4, 3, 2, 1, 0 |

## Cấu trúc thư mục

```text
flexbox-order/
├── index.html     # Giao diện Tailwind v4 (browser CDN)
├── style.css      # Quy tắc nền 600px, item, vòng focus
├── script.js      # Áp dụng order thật, chuyển động FLIP, đo thứ tự hiển thị
└── README.md
```
