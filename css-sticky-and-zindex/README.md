# Khảo Sát Position Sticky và Z-Index Trong CSS

Ứng dụng mô phỏng trực quan cơ chế dính theo khung cuộn của `position: sticky` và thứ tự phân lớp theo trục không gian Z (`z-index`).

## 1. Cơ chế `position: sticky`

- **Cơ chế lai giữa relative và fixed**: Ban đầu phần tử trôi tự nhiên theo luồng tài liệu. Khi cuộn tới ngưỡng chỉ định (ví dụ `top: 0`), nó sẽ ghim cố định lại.
- **Giới hạn phạm vi**: Phần tử sticky **chỉ hoạt động bên trong phạm vi thẻ cha** trực tiếp chứa nó. Khi cuộn hết thẻ cha, nó sẽ trôi theo thẻ cha ra ngoài màn hình.
- **Điều kiện cần**: Bắt buộc phải có ít nhất một thuộc tính định vị ngưỡng (`top`, `bottom`, `left`, hoặc `right`). Không có bất kỳ thẻ tổ tiên nào được đặt `overflow: hidden`.

## 2. Lớp không gian `z-index`

- **Trục Z (Chiều sâu)**: Quy định thứ tự lớp đè lên nhau. Giá trị số nguyên càng lớn thì phần tử càng nằm phía trên cùng.
- **Điều kiện hiệu lực**: Chỉ hoạt động trên các phần tử có `position` khác `static` (hoặc là con của flexbox / grid container).

## Cấu trúc thư mục

```text
css-sticky-and-zindex/
├── index.html     # Giao diện 2 tab (Sticky và Z-Index)
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Đồng bộ cuộn dính và thanh trượt z-index
└── README.md      # Tài liệu hướng dẫn
```
