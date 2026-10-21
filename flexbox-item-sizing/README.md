# Co giãn Flex Item: flex-grow, flex-shrink, flex-basis

Ứng dụng cho chỉnh `flex-grow`, `flex-shrink`, `flex-basis` của từng item (A, B, C) và chiều rộng container. Bảng tính so sánh kích thước tính theo công thức với kích thước đo thực tế trên trình duyệt.

## Công thức

1. Khoảng trống = vùng nội dung container − tổng gap − Σ`flex-basis`.
2. Nếu **dư** (> 0): mỗi item nhận `dư × grow / Σgrow`. Σgrow = 0 thì phần dư bỏ trống.
3. Nếu **thiếu** (< 0): mỗi item co `thiếu × (shrink × basis) / Σ(shrink × basis)`. Basis lớn co nhiều hơn; shrink = 0 thì không co.

> Item đặt `min-width: 0` để bỏ giới hạn min-content mặc định, giúp số đo khớp đúng công thức.

## Mẫu nhanh

| Mẫu | CSS |
| :--- | :--- |
| Chia đều | `flex: 1 1 0px` cho cả 3 |
| B gấp đôi | A, C `flex: 1 1 0px`; B `flex: 2 1 0px` |
| Sidebar cố định | A `flex: 0 0 160px`; B `flex: 1 1 0px` |

## Cấu trúc thư mục

```text
flexbox-item-sizing/
├── index.html     # Giao diện Tailwind v4 (browser CDN)
├── style.css      # Quy tắc nền 600px, item (min-width: 0)
├── script.js      # Áp dụng flex thật, mô phỏng thuật toán chia/co, đo thực tế
└── README.md
```
