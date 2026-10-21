# Giới thiệu Flexbox: bố cục một chiều

Ứng dụng so sánh 3 cách xếp cùng 3 phần tử con và đo trực tiếp kết quả trên trình duyệt (hướng xếp, khe hở giữa A và B, chiều cao từng item).

## Nội dung tương tác

| Cách xếp | CSS | Quan sát |
| :--- | :--- | :--- |
| Block | `.item { display: block }` | Xếp dọc, mỗi item một dòng, chiếm hết chiều ngang |
| Inline-block | `.item { display: inline-block }` | Xếp ngang nhưng có khe hở ~4px do khoảng trắng HTML, căn theo baseline nên chiều cao không đều |
| Flex | `.container { display: flex }` | Xếp ngang theo trục chính, khe hở 0px, item giãn cao bằng nhau (`align-items: stretch`) |

- Công tắc `align-items: center` (chỉ bật được khi thẻ cha là flex) cho thấy căn giữa dọc chỉ cần một dòng CSS.
- Nhãn "flex item" chỉ hiện khi thẻ cha là flex container.

## Cấu trúc thư mục

```text
flexbox-introduction/
├── index.html     # Giao diện Tailwind v4 (browser CDN)
├── style.css      # Quy tắc nền 600px và nhãn flex item
├── script.js      # Áp dụng display thật, đo bằng getBoundingClientRect
└── README.md
```
