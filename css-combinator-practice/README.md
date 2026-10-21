# Thực Hành Bộ Chọn Kết Hợp (Combinator Practice)

Ứng dụng bài tập thực hành tương tác giúp học viên rèn luyện kỹ năng nhắm mục tiêu phần tử bằng 4 loại bộ chọn kết hợp CSS trong cấu trúc bài viết thực tế.

## 4 Nhiệm vụ thử thách

1. **Nhiệm vụ 1: Con trực tiếp (Child)**
   - Mục tiêu: Chỉ chọn các thẻ `<p>` là con trực tiếp của bài viết (bỏ qua thẻ nằm lồng trong khối trích dẫn).
   - Cú pháp mẫu: `.mock-article > p`
2. **Nhiệm vụ 2: Liền kề sau h2 (Adjacent Sibling)**
   - Mục tiêu: Chọn đúng duy nhất một đoạn văn `<p>` nằm sát ngay phía sau tiêu đề `<h2>`.
   - Cú pháp mẫu: `h2 + p`
3. **Nhiệm vụ 3: Hậu duệ menu (Descendant)**
   - Mục tiêu: Chọn thẻ `<li>` nằm lồng bên trong menu con `.mock-sub-list`.
   - Cú pháp mẫu: `.mock-sub-list li`
4. **Nhiệm vụ 4: Anh em chung (General Sibling)**
   - Mục tiêu: Chọn tất cả các đoạn văn `<p>` là anh em cùng cha đứng phía sau `<h2>`.
   - Cú pháp mẫu: `h2 ~ p`

## Cấu trúc thư mục

```text
css-combinator-practice/
├── index.html     # Giao diện bài tập và bài viết mẫu
├── style.css      # Định dạng chuẩn tỉ lệ 600px cho LMS embed
├── script.js       # Logic chấm điểm và kiểm tra selector theo thời gian thực
└── README.md      # Tài liệu hướng dẫn
```
