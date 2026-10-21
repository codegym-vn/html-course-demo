# Hệ Màu Sắc Trong CSS (HEX, RGB, RGBA)

Ứng dụng tương tác trực quan hóa cơ chế biểu diễn màu sắc trong CSS: mô hình cộng màu RGB, giải mã hệ thập lục phân HEX, kênh trong suốt Alpha (`rgba`), và sự khác biệt với thuộc tính `opacity`.

---

## 1. Kiến Thức Trọng Tâm

### 1.1. Mô hình RGB (Red, Green, Blue)
- Mô hình cộng màu (Additive color mixing) trên màn hình số.
- Mỗi kênh nhận giá trị nguyên từ `0` (tắt) đến `255` (sáng tối đa) - tương ứng 1 byte ($2^8 = 256$ mức).
- `rgb(0, 0, 0)`: Màu đen (không có ánh sáng).
- `rgb(255, 255, 255)`: Màu trắng (cả 3 kênh cực đại).

### 1.2. Mã HEX (#RRGGBB và #RRGGBBAA)
- Hệ thập lục phân (cơ số 16): `0-9` và `A-F` ($A=10, B=11, C=12, D=13, E=14, F=15$).
- Mỗi kênh 0-255 được biểu diễn bằng 2 ký tự:
  $$\text{Giá trị} = (\text{Ký tự 1} \times 16) + \text{Ký tự 2}$$
  - Ví dụ: `3B` = $(3 \times 16) + 11 = 59$.
  - Ví dụ: `FF` = $(15 \times 16) + 15 = 255$.
- Viết tắt 3 ký tự: `#RGB` tương đương `#RRGGBB` (nhân đôi ký tự, ví dụ `#F00` = `#FF0000`).
- Dạng 8 ký tự: `#RRGGBBAA` với `AA` là giá trị Alpha từ `00` (0%) đến `FF` (100%).

### 1.3. Phân biệt `rgba()` và `opacity`
- `background-color: rgba(r, g, b, alpha)`: Chỉ làm trong suốt màu nền. Nội dung chữ và phần tử con giữ nguyên 100% độ rõ.
- `opacity: alpha`: Làm mờ toàn bộ phần tử và tất cả phần tử con bên trong.

### 1.4. Cú pháp hiện đại (CSS Color Module Level 4)
- `rgb(r g b / alpha)` không dùng dấu phẩy, hỗ trợ phần trăm cho alpha (ví dụ: `rgb(59 130 246 / 90%)`).

---

## 2. Hướng Dẫn Sử Dụng

1. **Điều chỉnh kênh R, G, B, A**: Dùng thanh trượt hoặc nhập số để quan sát sự thay đổi màu.
2. **Quan sát bảng giải mã HEX**: Theo dõi chuyển đổi từng cặp ký tự sang giá trị thập phân.
3. **So sánh RGBA vs Opacity**: Giảm Alpha xuống dưới `0.5` để so sánh độ rõ nét của chữ giữa 2 phương pháp.
4. **Sao chép mã**: Bấm nút Copy tại dòng cú pháp tương ứng để lấy mã CSS.

---

## 3. Cấu Trúc Thư Mục

```text
css-colors-mastery/
├── index.html     # Cấu trúc HTML (tối ưu kích thước 600px cho LMS)
├── style.css      # Định kiểu giao diện gọn gàng, không thanh cuộn
├── script.js      # Logic tính toán & tương tác
└── README.md      # Tài liệu tóm tắt kiến thức
```

