# Trục chính và trục phụ trong Flexbox

Ứng dụng cho thấy `flex-direction` quyết định hướng của trục chính (main axis) và trục phụ (cross axis). Mũi tên trục được vẽ bằng SVG theo kích thước thật của flex container.

## Nội dung tương tác

| `flex-direction` | Trục chính | Trục phụ | `flex-start` của trục chính |
| :--- | :--- | :--- | :--- |
| `row` | Ngang, trái → phải | Dọc, trên → dưới | Mép trái |
| `row-reverse` | Ngang, phải → trái | Dọc, trên → dưới | Mép phải |
| `column` | Dọc, trên → dưới | Ngang, trái → phải | Mép trên |
| `column-reverse` | Dọc, dưới → trên | Ngang, trái → phải | Mép dưới |

- `justify-content` luôn căn theo trục chính, `align-items` luôn căn theo trục phụ. Khi đổi `row` sang `column`, hai thuộc tính này đổi hướng vật lý theo.
- 4 item có kích thước khác nhau (`flex-shrink: 0`) để thấy rõ căn chỉnh trên trục phụ.

## Cấu trúc thư mục

```text
flexbox-axes/
├── index.html     # Giao diện Tailwind v4 (browser CDN)
├── style.css      # Quy tắc nền 600px, kiểu flex item
├── script.js      # Áp dụng CSS thật, vẽ mũi tên trục bằng SVG
└── README.md
```
