/**
 * CẤU TRÚC TÀI LIỆU HTML
 * File: script.js
 */

(function () {
  'use strict';

  const explanations = {
    doctype: {
      tag: '<!DOCTYPE html>',
      location: 'Dòng đầu tiên của tài liệu',
      desc: 'Khai báo chuẩn HTML5 cho trình duyệt biết cách hiển thị trang web theo chuẩn hiện đại nhất.',
      highlight: null
    },
    html: {
      tag: '<html lang="vi">',
      location: 'Thẻ gốc (Root element)',
      desc: 'Bao bọc toàn bộ nội dung của trang web. Thuộc tính lang="vi" khai báo ngôn ngữ chính là tiếng Việt để hỗ trợ SEO và bộ đọc màn hình.',
      highlight: null
    },
    head: {
      tag: '<head>',
      location: 'Phần đầu tài liệu',
      desc: 'Chứa các thông tin cấu hình (Metadata), liên kết CSS, font chữ và tiêu đề trang. Nội dung trong head KHÔNG hiển thị trực tiếp lên trang trắng.',
      highlight: 'tab'
    },
    meta: {
      tag: '<meta charset="UTF-8">',
      location: 'Nằm trong <head>',
      desc: 'Khai báo bảng mã ký tự UTF-8, giúp trang web hiển thị đúng tiếng Việt có dấu mà không bị lỗi font.',
      highlight: null
    },
    title: {
      tag: '<title>',
      location: 'Nằm trong <head>',
      desc: 'Quy định tiêu đề trang xuất hiện trên tab trình duyệt, dấu trang (bookmark) và dòng tiêu đề kết quả tìm kiếm Google.',
      highlight: 'tab'
    },
    body: {
      tag: '<body>',
      location: 'Thân tài liệu',
      desc: 'Chứa toàn bộ nội dung mà người dùng thực sự nhìn thấy trên màn hình: văn bản, hình ảnh, nút bấm, bảng biểu, video,...',
      highlight: 'viewport'
    },
    h1: {
      tag: '<h1>',
      location: 'Nằm trong <body>',
      desc: 'Tiêu đề quan trọng nhất của trang web (cấp độ 1). Mỗi trang chỉ nên có duy nhất 1 thẻ h1 để tối ưu SEO.',
      highlight: 'viewport'
    },
    p: {
      tag: '<p>',
      location: 'Nằm trong <body>',
      desc: 'Thẻ định nghĩa một đoạn văn bản (Paragraph). Trình duyệt tự động tạo khoảng cách phía trên và phía dưới đoạn văn.',
      highlight: 'viewport'
    }
  };

  const defaultValues = {
    title: 'Trang web của tôi',
    h1: 'Xin chào thế giới!'
  };

  const el = {
    codeEditor: document.getElementById('codeEditor'),
    inputTitle: document.getElementById('inputTitle'),
    inputH1: document.getElementById('inputH1'),
    codeTitleVal: document.getElementById('codeTitleVal'),
    codeH1Val: document.getElementById('codeH1Val'),
    browserTabTitle: document.getElementById('browserTabTitle'),
    browserTab: document.getElementById('browserTab'),
    browserViewport: document.getElementById('browserViewport'),
    viewportH1: document.getElementById('viewportH1'),
    expTagName: document.getElementById('expTagName'),
    expLocation: document.getElementById('expLocation'),
    expDesc: document.getElementById('expDesc'),
    btnReset: document.getElementById('btnReset')
  };

  function selectTag(tagKey) {
    const data = explanations[tagKey];
    if (!data) return;

    // Cập nhật active class ở dòng code
    document.querySelectorAll('.tag-row').forEach(row => {
      row.classList.remove('active');
      if (row.dataset.tag === tagKey) {
        row.classList.add('active');
      }
    });

    // Cập nhật giải thích
    el.expTagName.textContent = data.tag;
    el.expLocation.textContent = data.location;
    el.expDesc.textContent = data.desc;

    // Hiệu ứng highlight trên trình duyệt mô phỏng
    el.browserTab.classList.remove('glow');
    el.browserViewport.classList.remove('glow');

    if (data.highlight === 'tab') {
      el.browserTab.classList.add('glow');
    } else if (data.highlight === 'viewport') {
      el.browserViewport.classList.add('glow');
    }
  }

  function setupEvents() {
    // Click vào từng dòng code
    el.codeEditor.addEventListener('click', (e) => {
      const row = e.target.closest('.tag-row');
      if (!row || !row.dataset.tag) return;
      selectTag(row.dataset.tag);
    });

    // Đồng bộ input Title
    el.inputTitle.addEventListener('input', (e) => {
      const val = e.target.value || 'Trang web của tôi';
      el.codeTitleVal.textContent = val;
      el.browserTabTitle.textContent = val;
      selectTag('title');
    });

    // Đồng bộ input H1
    el.inputH1.addEventListener('input', (e) => {
      const val = e.target.value || 'Tiêu đề trang';
      el.codeH1Val.textContent = val;
      el.viewportH1.textContent = val;
      selectTag('h1');
    });

    // Reset
    el.btnReset.addEventListener('click', () => {
      el.inputTitle.value = defaultValues.title;
      el.inputH1.value = defaultValues.h1;
      el.codeTitleVal.textContent = defaultValues.title;
      el.codeH1Val.textContent = defaultValues.h1;
      el.browserTabTitle.textContent = defaultValues.title;
      el.viewportH1.textContent = defaultValues.h1;
      selectTag('title');
    });
  }

  setupEvents();
  selectTag('title');
})();
