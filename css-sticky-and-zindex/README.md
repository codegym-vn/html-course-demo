# Position Sticky và Z-Index

Ứng dụng 2 tab, giao diện Tailwind CSS v4 (browser CDN). Mọi hiệu ứng dùng CSS thật; trạng thái "đang dính" và hộp nằm trên được đo trực tiếp từ trình duyệt.

## Tab 1: `position: sticky`

- So sánh `sticky` với `relative` trên tiêu đề 3 mục A, B, C.
- Thanh trượt `top` (0–80px), vạch nét đứt vàng đánh dấu ngưỡng dính.
- Công tắc `overflow: hidden` trên mục cha: mục cha thành khung cuộn gần nhất nên sticky không bao giờ dính (lỗi phổ biến nhất).
- Dòng "Đang dính" cập nhật khi cuộn.

| Đặc điểm | `sticky` |
| :--- | :--- |
| Chiếm chỗ trong luồng | Có |
| Điều kiện | Phải có `top`/`bottom`/`left`/`right` |
| Phạm vi dính | Trong thẻ cha trực tiếp |
| Khung tham chiếu | Tổ tiên gần nhất có `overflow` khác `visible` |

## Tab 2: `z-index`

- 3 hộp chồng nhau, thanh trượt `z-index` 0–10 cho từng hộp.
- Hộp 2 `position: static`: `z-index` bị bỏ qua, hộp bị vẽ dưới các hộp đã định vị.
- Bọc Hộp 1 trong thẻ cha `position: relative; z-index: 1`: tạo stacking context, `z-index` của Hộp 1 chỉ so trong thẻ cha.
- Kết quả vùng chồng 1–2 và 2–3 lấy bằng `document.elementFromPoint`.

## Cấu trúc thư mục

```text
css-sticky-and-zindex/
├── index.html     # Giao diện Tailwind v4, 2 tab
├── style.css      # Quy tắc nền 600px, tiêu đề sticky, hộp z-index
├── script.js      # Áp dụng CSS thật, phát hiện dính, đo hộp nằm trên
└── README.md
```
