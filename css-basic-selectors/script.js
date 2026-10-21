/**
 * BỘ CHỌN CSS CƠ BẢN (CSS SELECTORS)
 * File: script.js
 */

(function () {
  'use strict';

  const defaultSelector = '.card';

  const el = {
    customSelectorInput: document.getElementById('customSelectorInput'),
    matchBadge: document.getElementById('matchBadge'),
    specTotal: document.getElementById('specTotal'),
    specIdVal: document.getElementById('specIdVal'),
    specClassVal: document.getElementById('specClassVal'),
    specElemVal: document.getElementById('specElemVal'),
    specDesc: document.getElementById('specDesc'),
    pageCanvas: document.getElementById('pageCanvas'),
    cssCodeOutput: document.getElementById('cssCodeOutput'),
    btnCopy: document.getElementById('btnCopy'),
    btnReset: document.getElementById('btnReset')
  };

  /** Tính điểm ưu tiên Specificity đơn giản (ID, Class, Element) */
  function calculateSpecificity(selector) {
    let idCount = 0;
    let classCount = 0;
    let elemCount = 0;

    // Tìm id (#...)
    const idMatches = selector.match(/#[a-zA-Z0-9_-]+/g);
    if (idMatches) idCount = idMatches.length;

    // Tìm class (....)
    const classMatches = selector.match(/\.[a-zA-Z0-9_-]+/g);
    if (classMatches) classCount = classMatches.length;

    // Tìm thẻ (element)
    const clean = selector.replace(/#[a-zA-Z0-9_-]+/g, '').replace(/\.[a-zA-Z0-9_-]+/g, '').trim();
    if (clean) {
      const tagMatches = clean.match(/[a-zA-Z0-9]+/g);
      if (tagMatches) elemCount = tagMatches.length;
    }

    const totalScore = idCount * 100 + classCount * 10 + elemCount * 1;
    return { idCount, classCount, elemCount, totalScore };
  }

  function applySelector(selectorStr) {
    const sel = selectorStr.trim();
    if (!sel) return;

    // Bỏ highlight cũ
    document.querySelectorAll('.mock-elem').forEach(node => {
      node.classList.remove('is-matched');
    });

    try {
      const matched = el.pageCanvas.querySelectorAll(sel);
      matched.forEach(node => {
        if (node.classList.contains('mock-elem')) {
          node.classList.add('is-matched');
        }
      });

      const count = matched.length;
      el.matchBadge.textContent = `Khớp: ${count}`;
      el.matchBadge.style.color = count > 0 ? '#93c5fd' : '#f87171';
      el.pageCanvas.classList.toggle('has-selection', count > 0);
    } catch (e) {
      el.matchBadge.textContent = 'Cú pháp lỗi';
      el.matchBadge.style.color = '#f87171';
      el.pageCanvas.classList.remove('has-selection');
    }

    // Tính Specificity
    const { idCount, classCount, elemCount, totalScore } = calculateSpecificity(sel);
    el.specIdVal.textContent = idCount;
    el.specClassVal.textContent = classCount;
    el.specElemVal.textContent = elemCount;
    el.specTotal.textContent = `Điểm: (${idCount}, ${classCount}, ${elemCount}) = ${totalScore}`;

    // Giải thích
    if (idCount > 0) {
      el.specDesc.textContent = 'Bộ chọn ID có độ ưu tiên rất cao (100 điểm), chỉ nên dùng cho phần tử độc nhất vô nhị trên trang.';
    } else if (classCount > 0) {
      el.specDesc.textContent = 'Bộ chọn Class (10 điểm) linh hoạt nhất, có thể tái sử dụng cho nhiều phần tử có cùng mục đích hiển thị.';
    } else if (elemCount > 0) {
      el.specDesc.textContent = 'Bộ chọn Thẻ (1 điểm) áp dụng rộng rãi cho mọi thẻ cùng loại trên toàn bộ trang web.';
    } else {
      el.specDesc.textContent = 'Nhập selector để kiểm tra mức độ ưu tiên.';
    }

    // Cập nhật preset buttons active state
    document.querySelectorAll('.btn-sel').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sel === sel);
    });

    // Sinh code
    el.cssCodeOutput.textContent = `${sel} { outline: 2px solid #3b82f6; }`;
  }

  function setupEvents() {
    // Input gõ tay
    el.customSelectorInput.addEventListener('input', (e) => {
      applySelector(e.target.value);
    });

    // Preset buttons
    document.querySelectorAll('.btn-sel').forEach(btn => {
      btn.addEventListener('click', () => {
        const sel = btn.dataset.sel;
        el.customSelectorInput.value = sel;
        applySelector(sel);
      });
    });

    // Copy code
    el.btnCopy.addEventListener('click', async () => {
      const text = el.cssCodeOutput.textContent;
      try {
        await navigator.clipboard.writeText(text);
        el.btnCopy.textContent = 'Đã chép';
        setTimeout(() => { el.btnCopy.textContent = 'Copy'; }, 1200);
      } catch (err) {
        el.btnCopy.textContent = 'Đã chép';
        setTimeout(() => { el.btnCopy.textContent = 'Copy'; }, 1200);
      }
    });

    // Reset
    el.btnReset.addEventListener('click', () => {
      el.customSelectorInput.value = defaultSelector;
      applySelector(defaultSelector);
    });
  }

  setupEvents();
  applySelector(defaultSelector);
})();
