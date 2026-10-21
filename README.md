# Khóa Học: Xây Dựng Giao Diện Web Với HTML & CSS
## Kho Ứng Dụng Tương Tác & Minh Họa Trực Quan (Interactive Demos)

Repository này chứa bộ sưu tập các ứng dụng tương tác (interactive mini-apps/playgrounds) phục vụ cho khóa học **"Xây dựng giao diện web với HTML và CSS"**. 

Mỗi ứng dụng được xây dựng nhằm mục đích giúp học viên trực quan hóa các khái niệm trừu tượng (như Box Model, Flexbox, Grid, Positioning, Selector Specificity, Animation,...), cho phép tinh chỉnh các thuộc tính trong thời gian thực để hiểu sâu bản chất cách trình duyệt render giao diện.

---

## 1. Quy Ước Cấu Trúc Thư Mục

Mỗi ứng dụng tương tác nằm độc lập trong một thư mục riêng biệt ở cấp gốc của dự án.

### 1.1. Cấu trúc tổng quan repo
```text
html-course-demo/
├── README.md                          # Tài liệu quy chuẩn chung (file này)
├── html-semantics-viewer/          # Ứng dụng minh họa cấu trúc HTML5 ngữ nghĩa
├── box-model-visualizer/           # Ứng dụng tinh chỉnh Box Model trực quan
├── flexbox-playground/             # Sân chơi tương tác Flexbox
├── css-grid-generator/             # Ứng dụng giả lập CSS Grid
└── ...
```

### 1.2. Cấu trúc chuẩn bên trong mỗi thư mục ứng dụng
Mỗi thư mục đại diện cho **01 ứng dụng độc lập** và tuân theo cấu trúc sau:

```text
<ten-ung-dung>/
├── index.html         # Giao diện chính, khung điều khiển và vùng hiển thị demo
├── style.css          # Toàn bộ CSS (tổ chức theo biến CSS, modular, responsive)
├── script.js          # Logic điều khiển tương tác (Vanilla JS)
├── README.md          # Giải thích mục tiêu bài học, thuộc tính demo & hướng dẫn sử dụng
└── assets/            # Thư mục tài nguyên (hình ảnh, icon, font demo - nếu có)
    ├── images/
    └── icons/
```

> **Lưu ý**: Mỗi ứng dụng phải hoạt động độc lập (Standalone). Người học có thể mở trực tiếp file `index.html` qua trình duyệt hoặc Live Server mà không cần cài đặt thêm môi trường build/bundler phức tạp.

---

## 2. Tiêu Chuẩn Kỹ Thuật (Tech Stack & Coding Standards)

### 2.1. HTML (Cấu trúc & Ngữ nghĩa)
- Sử dụng chuẩn **HTML5** với đầy đủ các thẻ ngữ nghĩa (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Đặt `id` và `class` rõ ràng, có tính mô tả cao (khuyến khích quy ước kebab-case hoặc BEM: `block__element--modifier`).
- Luôn có thẻ `<meta charset="UTF-8">` và `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Ghi chú (comment) giải thích rõ các khối cấu trúc để học viên dễ theo dõi.

### 2.2. CSS (Trình bày & Thẩm mỹ)
- **Công nghệ**: Sử dụng **Vanilla CSS** hiện đại.
- **Biến CSS (CSS Variables)**: Định nghĩa bảng màu, font chữ, spacing, radius tập trung tại `:root` để dễ bảo trì và giải thích cho học viên.
- **Thẩm mỹ (Rich Aesthetics)**: Giao diện phải hiện đại, sang trọng, màu sắc hài hòa (Dark/Light mode hài hòa, đổ bóng mượt mà, micro-animations, glassmorphism khi phù hợp).
- **Responsive**: Giao diện co giãn tốt trên nhiều kích thước màn hình (Desktop, Tablet, Mobile).
- **Trực quan hóa**: Dùng màu sắc đối lập, đường viền rõ nét để biểu diễn các khái niệm như Margin, Border, Padding, Content box, Flex-items, Grid-tracks.

### 2.3. JavaScript (Tương tác trực quan)
- **Công nghệ**: Sử dụng **Vanilla JavaScript (ES6+)**, không dùng framework bên ngoài để giữ mã nguồn gần gũi với người mới bắt đầu.
- **Mục đích của JS**:
  - Lắng nghe sự kiện từ bảng điều khiển (slider, toggle, select box, input).
  - Cập nhật trực tiếp style/class trên phần tử demo.
  - Hiển thị đoạn code CSS tương ứng (Live CSS Snippet) để học viên có thể copy vào bài tập thực hành.
- **Chất lượng code**: Code tách biệt rõ ràng giữa quản lý trạng thái (state), DOM elements và hàm render.

### 2.4. Quy Chuẩn Nội Dung & Biểu Tượng (Content & Icon Guidelines)
- **Không sử dụng icon AI / emoji** (ví dụ: 🚀, 💡, 🎯, 🎛️, 🔬,...). Chỉ dùng SVG vector đơn giản khi thực sự cần thiết hoặc chỉ dùng text thuần.
- **Đơn giản, đúng trọng tâm, không có lời lẽ thừa**: Văn bản giải thích ngắn gọn, đi thẳng vào bản chất kỹ thuật, không dùng từ ngữ sáo rỗng hoặc câu chữ rườm rà.

### 2.5. Tương Thích Nhúng LMS (LMS Embed & Dimensions)
- **Chiều cao khuyến nghị: 600px**: Giao diện được tối ưu để hiển thị vừa vặn trong khung iframe 600px mà không bị cuộn trang phức tạp.
- **Thiết kế gọn nhẹ (Compact Single-View UI)**: Tập trung vào 1 màn hình duy nhất, loại bỏ banner/footer cồng kềnh, chỉ giữ lại phần điều khiển và phần trực quan hóa cốt lõi.
- **Kích thước chữ dễ đọc (Typography Readability)**: Cỡ chữ nền `font-size: 15px`, nhãn phụ tối thiểu `12px` (`0.8rem`), chữ nội dung chính và code từ `13px - 16px` để học viên không phải căng mắt khi đọc trong iframe.

---

## 3. Trải Nghiệm Học Tập Tiêu Chuẩn (UX Guidelines cho mỗi Demo)

Mỗi ứng dụng tương tác nên bao gồm 3 phân vùng chính:

1. **Header / Thanh tiêu đề**:
   - Tên ứng dụng & khái niệm đang học.
   - Nút liên kết hoặc hướng dẫn ngắn (Tooltip / Help modal).
2. **Bảng điều khiển (Control Panel)**:
   - Các công cụ tương tác: Thanh trượt (`<input type="range">`), Dropdown lựa chọn giá trị thuộc tính, Nút bấm thêm/bớt phần tử.
   - Reset button: Đưa toàn bộ cấu hình về mặc định ban đầu.
3. **Khu vực hiển thị (Preview Stage & Code Output)**:
   - **Vùng Canvas/Preview**: Nơi phần tử giao diện thay đổi theo thời gian thực khi học viên chỉnh các nút ở Control Panel.
   - **CSS Output Box**: Hiển thị cú pháp CSS chuẩn xác được sinh ra sau tương tác kèm nút **Copy Code**.

---

## 4. Quy Ước Đặt Tên (Naming Conventions)

| Đối tượng | Quy ước | Ví dụ |
| :--- | :--- | :--- |
| **Thư mục ứng dụng** | `kebab-case` mô tả đúng nội dung bài | `box-model-visualizer`, `flexbox-playground`, `css-colors-mastery` |
| **File mã nguồn** | Chữ thường, phân cách bởi dấu gạch ngang | `index.html`, `style.css`, `script.js` |
| **CSS Class** | `kebab-case` hoặc BEM | `.control-panel`, `.preview-stage__item--active` |
| **CSS Variables** | `--ten-bien-kebab-case` | `--color-primary`, `--spacing-md`, `--radius-lg` |
| **Biến/Hàm JS** | `camelCase` | `currentFlexDirection`, `updatePreviewStyle()` |

---

## 5. Quy Trình Khởi Tạo Một Ứng Dụng Mới

Khi triển khai thêm một bài tương tác mới:

1. **Tạo thư mục**: Tạo thư mục mới theo quy ước đặt tên (VD: `05-css-positioning-guide`).
2. **Khởi tạo 4 file cơ bản**:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md` (mô tả riêng cho ứng dụng đó: mục tiêu học tập, danh sách thuộc tính có thể tương tác).
3. **Phát triển giao diện**:
   - Dựng khung Semantic HTML.
   - Thiết kế giao diện hiện đại với CSS Variables.
   - Viết JS liên kết tương tác thời gian thực.
4. **Kiểm thử**: Mở qua Live Server, kiểm tra độ mượt của tương tác và độ co giãn giao diện.
5. **Cập nhật Mục lục**: Bổ sung liên kết và mô tả ngắn của ứng dụng vào bảng danh sách bên dưới.

---

## 6. Danh Mục Các Ứng Dụng (Curriculum & Demo Catalog)

| STT | Tên thư mục | Chủ đề / Khái niệm minh họa | Trạng thái |
| :---: | :--- | :--- | :---: |
| 01 | [html-document-structure](./html-document-structure/) | **Cấu trúc file HTML:** `<!DOCTYPE>`, `<html>`, `<head>`, `<meta>`, `<title>`, `<body>`, mô phỏng tab trình duyệt. | Hoàn thành |
| 02 | [html-image-attributes](./html-image-attributes/) | **Thẻ hình ảnh `<img>`:** Thuộc tính `src`, `alt`, `width`, `height`, mô phỏng ảnh hỏng và chống giật layout (CLS). | Hoàn thành |
| 03 | [html-anchor-links](./html-anchor-links/) | **Thẻ liên kết `<a>`:** Liên kết ngoài, liên kết neo `#id`, `mailto:`, `tel:`, thuộc tính `target` và bảo mật `rel`. | Hoàn thành |
| 04 | [css-inclusion-methods](./css-inclusion-methods/) | **Ba cách viết CSS:** Inline, Internal, External và cơ chế ưu tiên (Cascade). | Hoàn thành |
| 05 | [css-syntax-anatomy](./css-syntax-anatomy/) | **Cú pháp CSS:** Giải phẫu `selector { property: value; }` và mô phỏng lỗi cú pháp thường gặp. | Hoàn thành |
| 06 | [css-basic-selectors](./css-basic-selectors/) | **Bộ chọn CSS cơ bản:** Element, Class, ID, nhắm mục tiêu phần tử và tính điểm Specificity. | Hoàn thành |
| 07 | [css-typography-basics](./css-typography-basics/) | **Thuộc tính kiểu chữ:** Font-family, font-size, font-weight, line-height, text-align. | Hoàn thành |
| 08 | [css-colors-mastery](./css-colors-mastery/) | **Thế giới màu sắc trong CSS:** Làm chủ hệ màu HEX, RGB, RGBA, giải mã hệ thập lục phân, so sánh `rgba()` và `opacity`, tương phản WCAG. | Hoàn thành |
| 09 | [css-box-model-visualizer](./css-box-model-visualizer/) | **Mô hình hộp CSS (Box Model):** 4 lớp Content, Padding, Border, Margin chuẩn Chrome DevTools và công thức tính tổng không gian hiển thị. | Hoàn thành |
| 10 | [css-box-sizing-comparison](./css-box-sizing-comparison/) | **So sánh Box-Sizing:** `content-box` (vỡ layout do padding/border) vs `border-box` (giữ chuẩn kích thước định sẵn) và CSS Reset toàn cục. | Hoàn thành |
| 11 | [css-display-modes](./css-display-modes/) | **Thuộc tính Display:** Khảo sát luồng tài liệu, xuống dòng và hiệu lực kích thước giữa `block`, `inline`, `inline-block`. | Hoàn thành |
| 12 | [css-combinator-selectors](./css-combinator-selectors/) | **Bài 1 (Phần 1) - Bộ chọn kết hợp:** 4 loại Descendant (` `), Child (`>`), Adjacent Sibling (`+`), General Sibling (`~`) trên cây DOM. | Hoàn thành |
| 13 | [css-combinator-practice](./css-combinator-practice/) | **Bài 1 (Phần 2) - Luyện tập bộ chọn kết hợp:** Bài tập thử thách tương tác nhắm mục tiêu phần tử trong bài viết thực tế. | Hoàn thành |
| 14 | [css-pseudo-classes](./css-pseudo-classes/) | **Bài 2 - Lớp giả CSS (Pseudo-classes):** Hiệu ứng `:hover`, chỉ báo `:focus` / `:focus-visible` và bộ tạo công thức `:nth-child(an + b)`. | Hoàn thành |
| 15 | [css-pseudo-elements](./css-pseudo-elements/) | **Bài 3 - Phần tử giả (Pseudo-elements):** Tạo nội dung ảo `::before` và `::after`, thuộc tính bắt buộc `content` và các use case huy hiệu, trích dẫn. | Hoàn thành |
| 16 | [css-position-modes](./css-position-modes/) | **Bài 4 - Thuộc tính Position 2D:** 4 chế độ `static`, `relative`, `absolute`, `fixed` và mối quan hệ với thẻ cha `relative`. | Hoàn thành |
| 17 | [css-sticky-and-zindex](./css-sticky-and-zindex/) | **Bài 5 - Position Sticky & Z-Index:** Cơ chế dính trong phạm vi thẻ cha của `position: sticky` và thứ tự phân lớp trục Z `z-index`. | Hoàn thành |

---

## 7. Hướng Dẫn Chạy Cục Bộ (Local Development)

Không cần cài đặt `npm` hay môi trường máy chủ phức tạp:

1. Clone repository về máy tính:
   ```bash
   git clone https://github.com/codegym-vn/html-course-demo.git
   ```
2. Mở thư mục dự án bằng Visual Studio Code:
   ```bash
   code html-course-demo
   ```
3. Cài đặt tiện ích mở rộng **Live Server** (của Ritwick Dey).
4. Nhấp chuột phải vào file `index.html` của ứng dụng muốn xem và chọn **Open with Live Server**.
