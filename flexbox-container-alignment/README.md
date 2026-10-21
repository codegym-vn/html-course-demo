# Làm chủ Flex Container (Phần 1)

Ứng dụng thử các thuộc tính đặt trên flex container: `display`, `flex-direction`, `justify-content`, `align-items`. Khoảng trống dọc trục chính được đo trực tiếp (mép đầu, giữa các item, mép cuối).

## Nội dung tương tác

| Thuộc tính | Giá trị | Trục tác động |
| :--- | :--- | :--- |
| `display` | `block`, `flex` | Bật/tắt flex container |
| `flex-direction` | `row`, `row-reverse`, `column`, `column-reverse` | Chọn trục chính |
| `justify-content` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | Trục chính |
| `align-items` | `stretch`, `flex-start`, `center`, `flex-end`, `baseline` | Trục phụ |

- Số đo `start | gap · gap · gap | end` giúp phân biệt `space-around` (mép = 1/2 khoảng giữa) và `space-evenly` (mọi khoảng bằng nhau).
- 4 item có cỡ chữ và padding khác nhau để thấy tác dụng của `baseline`.
- Mẫu nhanh: thanh điều hướng (`space-between` + `center`), căn giữa hoàn toàn (`center` + `center`).

## Cấu trúc thư mục

```text
flexbox-container-alignment/
├── index.html     # Giao diện Tailwind v4 (browser CDN)
├── style.css      # Quy tắc nền 600px, viền item
├── script.js      # Áp dụng CSS thật, đo khoảng trống trục chính
└── README.md
```
