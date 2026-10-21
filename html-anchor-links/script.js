/**
 * THẺ LIÊN KẾT (ANCHOR LINKS)
 * File: script.js
 */

(function () {
  'use strict';

  const presets = {
    external: {
      href: 'https://codegym.vn',
      text: 'Truy cập CodeGym',
      target: '_blank',
      rel: true
    },
    anchor: {
      href: '#sectionContact',
      text: 'Cuộn xuống phần liên hệ',
      target: '_self',
      rel: false
    },
    mailto: {
      href: 'mailto:support@codegym.vn',
      text: 'Gửi email hỗ trợ',
      target: '_self',
      rel: false
    },
    tel: {
      href: 'tel:+84987654321',
      text: 'Gọi hotline tư vấn',
      target: '_self',
      rel: false
    }
  };

  const state = {
    type: 'external',
    href: presets.external.href,
    text: presets.external.text,
    target: presets.external.target,
    rel: presets.external.rel
  };

  const el = {
    linkTypeSelect: document.getElementById('linkTypeSelect'),
    inputHref: document.getElementById('inputHref'),
    inputText: document.getElementById('inputText'),
    selectTarget: document.getElementById('selectTarget'),
    checkRel: document.getElementById('checkRel'),
    relRow: document.getElementById('relRow'),
    relHint: document.getElementById('relHint'),
    demoAnchor: document.getElementById('demoAnchor'),
    viewportScrollArea: document.getElementById('viewportScrollArea'),
    sectionContact: document.getElementById('sectionContact'),
    tabNew: document.getElementById('tabNew'),
    newTabTitle: document.getElementById('newTabTitle'),
    btnCloseTab: document.getElementById('btnCloseTab'),
    actionAlert: document.getElementById('actionAlert'),
    anchorCodeOutput: document.getElementById('anchorCodeOutput'),
    btnCopy: document.getElementById('btnCopy'),
    btnReset: document.getElementById('btnReset')
  };

  function updateView() {
    // Cập nhật thẻ liên kết demo
    el.demoAnchor.textContent = state.text;
    el.demoAnchor.href = state.href;
    el.demoAnchor.target = state.target;

    if (state.target === '_blank' && state.rel) {
      el.demoAnchor.setAttribute('rel', 'noopener noreferrer');
      el.relRow.style.display = 'flex';
      el.relHint.style.display = 'block';
    } else if (state.target === '_blank') {
      el.demoAnchor.removeAttribute('rel');
      el.relRow.style.display = 'flex';
      el.relHint.style.display = 'block';
    } else {
      el.demoAnchor.removeAttribute('rel');
      el.relRow.style.display = 'none';
      el.relHint.style.display = 'none';
    }

    // Sinh mã HTML
    let relAttr = '';
    if (state.target === '_blank' && state.rel) {
      relAttr = ' rel="noopener noreferrer"';
    }
    const targetAttr = state.target === '_blank' ? ' target="_blank"' : '';
    el.anchorCodeOutput.textContent = `<a href="${state.href}"${targetAttr}${relAttr}>${state.text}</a>`;
  }

  function setupEvents() {
    // Đổi loại liên kết
    el.linkTypeSelect.addEventListener('change', (e) => {
      const type = e.target.value;
      state.type = type;
      state.href = presets[type].href;
      state.text = presets[type].text;
      state.target = presets[type].target;
      state.rel = presets[type].rel;

      el.inputHref.value = state.href;
      el.inputText.value = state.text;
      el.selectTarget.value = state.target;
      el.checkRel.checked = state.rel;

      updateView();
      el.actionAlert.textContent = `Chuyển sang chế độ: ${el.linkTypeSelect.options[el.linkTypeSelect.selectedIndex].text}`;
    });

    // Sửa href
    el.inputHref.addEventListener('input', (e) => {
      state.href = e.target.value;
      updateView();
    });

    // Sửa Link text
    el.inputText.addEventListener('input', (e) => {
      state.text = e.target.value;
      updateView();
    });

    // Sửa target
    el.selectTarget.addEventListener('change', (e) => {
      state.target = e.target.value;
      updateView();
    });

    // Checkbox rel
    el.checkRel.addEventListener('change', (e) => {
      state.rel = e.target.checked;
      updateView();
    });

    // Xử lý Click thử nghiệm trên thẻ <a>
    el.demoAnchor.addEventListener('click', (e) => {
      e.preventDefault(); // Ngăn trình duyệt thật chuyển trang để mô phỏng

      if (state.type === 'anchor') {
        // Cuộn xuống mục tiêu
        el.sectionContact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.sectionContact.classList.add('highlight');
        setTimeout(() => el.sectionContact.classList.remove('highlight'), 2000);
        el.actionAlert.textContent = 'Phản hồi: Trình duyệt tự động cuộn đến phần tử có id="sectionContact".';
      } else if (state.target === '_blank') {
        // Mở tab mới mô phỏng
        el.tabNew.style.display = 'flex';
        el.newTabTitle.textContent = state.href.replace(/^https?:\/\//, '');
        el.actionAlert.textContent = state.rel
          ? 'Phản hồi: Đã mở tab mới độc lập an toàn với rel="noopener noreferrer".'
          : 'Phản hồi: Đã mở tab mới (Cảnh báo: Thiếu rel="noopener" có thể gây rủi ro bảo mật tab-nabbing).';
      } else if (state.type === 'mailto') {
        el.actionAlert.textContent = `Phản hồi: Kích hoạt ứng dụng email mặc định gửi tới: ${state.href.replace('mailto:', '')}`;
      } else if (state.type === 'tel') {
        el.actionAlert.textContent = `Phản hồi: Kích hoạt ứng dụng quay số trên điện thoại gọi tới: ${state.href.replace('tel:', '')}`;
      } else {
        el.actionAlert.textContent = `Phản hồi: Tải trang mới ${state.href} ngay tại tab hiện tại (target="_self").`;
      }
    });

    // Đóng tab mới mô phỏng
    el.btnCloseTab.addEventListener('click', () => {
      el.tabNew.style.display = 'none';
      el.actionAlert.textContent = 'Đã đóng tab mô phỏng.';
    });

    // Copy mã
    el.btnCopy.addEventListener('click', async () => {
      const text = el.anchorCodeOutput.textContent;
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
      el.linkTypeSelect.value = 'external';
      state.type = 'external';
      state.href = presets.external.href;
      state.text = presets.external.text;
      state.target = presets.external.target;
      state.rel = presets.external.rel;

      el.inputHref.value = state.href;
      el.inputText.value = state.text;
      el.selectTarget.value = state.target;
      el.checkRel.checked = state.rel;
      el.tabNew.style.display = 'none';
      el.viewportScrollArea.scrollTop = 0;
      el.actionAlert.textContent = 'Trạng thái: Sẵn sàng thử nghiệm liên kết.';

      updateView();
    });
  }

  setupEvents();
  updateView();
})();
