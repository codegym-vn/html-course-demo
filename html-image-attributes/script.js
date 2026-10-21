/**
 * THUỘC TÍNH THẺ HÌNH ẢNH (IMG ATTRIBUTES)
 * File: script.js
 */

(function () {
  'use strict';

  const defaultState = {
    src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80',
    alt: 'Bức tranh dải màu gradient trừu tượng',
    width: 280,
    height: 180,
    isBroken: false,
    keepAspect: true
  };

  const state = { ...defaultState };

  const el = {
    imgSrcSelect: document.getElementById('imgSrcSelect'),
    btnToggleError: document.getElementById('btnToggleError'),
    inputAlt: document.getElementById('inputAlt'),
    checkAspect: document.getElementById('checkAspect'),
    rangeWidth: document.getElementById('rangeWidth'),
    numWidth: document.getElementById('numWidth'),
    rangeHeight: document.getElementById('rangeHeight'),
    numHeight: document.getElementById('numHeight'),
    statusIndicator: document.getElementById('statusIndicator'),
    imageWrapper: document.getElementById('imageWrapper'),
    previewImg: document.getElementById('previewImg'),
    htmlCodeOutput: document.getElementById('htmlCodeOutput'),
    btnCopy: document.getElementById('btnCopy'),
    btnReset: document.getElementById('btnReset')
  };

  const ASPECT_RATIO = defaultState.width / defaultState.height; // ~1.555

  function updateView() {
    // Kích thước wrapper
    el.imageWrapper.style.width = `${state.width}px`;
    el.imageWrapper.style.height = `${state.height}px`;

    // Trạng thái ảnh hỏng
    if (state.isBroken) {
      el.imageWrapper.classList.add('is-broken');
      el.previewImg.style.display = 'none';
      el.statusIndicator.textContent = 'Ảnh lỗi tải (Hiển thị văn bản alt)';
      el.statusIndicator.className = 'status-indicator error';
      el.btnToggleError.classList.add('active');
      el.btnToggleError.textContent = 'Khôi phục ảnh hợp lệ';

      // Hiển thị nội dung alt thay thế
      let altEl = el.imageWrapper.querySelector('.broken-alt-text');
      if (!altEl) {
        altEl = document.createElement('div');
        altEl.className = 'broken-alt-text';
        el.imageWrapper.appendChild(altEl);
      }
      altEl.textContent = `[Ảnh hỏng] alt: "${state.alt}"`;
      altEl.style.display = 'block';
    } else {
      el.imageWrapper.classList.remove('is-broken');
      el.previewImg.style.display = 'block';
      el.previewImg.src = state.src;
      el.previewImg.alt = state.alt;
      el.previewImg.width = state.width;
      el.previewImg.height = state.height;

      const altEl = el.imageWrapper.querySelector('.broken-alt-text');
      if (altEl) altEl.style.display = 'none';

      el.statusIndicator.textContent = 'Ảnh tải thành công';
      el.statusIndicator.className = 'status-indicator';
      el.btnToggleError.classList.remove('active');
      el.btnToggleError.textContent = 'Mô phỏng ảnh hỏng';
    }

    // Đồng bộ form inputs
    el.rangeWidth.value = state.width;
    el.numWidth.value = state.width;
    el.rangeHeight.value = state.height;
    el.numHeight.value = state.height;
    el.inputAlt.value = state.alt;

    // Sinh code HTML
    const displaySrc = state.isBroken ? 'hinh-anh-khong-ton-tai.jpg' : 'duong-dan-anh.jpg';
    el.htmlCodeOutput.textContent = `<img src="${displaySrc}" alt="${state.alt}" width="${state.width}" height="${state.height}">`;
  }

  function setupEvents() {
    // Đổi ảnh từ dropdown
    el.imgSrcSelect.addEventListener('change', (e) => {
      state.src = e.target.value;
      state.isBroken = false;
      updateView();
    });

    // Toggle lỗi ảnh
    el.btnToggleError.addEventListener('click', () => {
      state.isBroken = !state.isBroken;
      updateView();
    });

    // Thay đổi văn bản alt
    el.inputAlt.addEventListener('input', (e) => {
      state.alt = e.target.value;
      updateView();
    });

    // Toggle giữ tỉ lệ
    el.checkAspect.addEventListener('change', (e) => {
      state.keepAspect = e.target.checked;
    });

    // Width range / num
    function setWidth(w) {
      state.width = w;
      if (state.keepAspect) {
        state.height = Math.round(w / ASPECT_RATIO);
      }
      updateView();
    }

    el.rangeWidth.addEventListener('input', (e) => setWidth(parseInt(e.target.value, 10)));
    el.numWidth.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 100;
      setWidth(Math.max(100, Math.min(420, val)));
    });

    // Height range / num
    function setHeight(h) {
      state.height = h;
      if (state.keepAspect) {
        state.width = Math.round(h * ASPECT_RATIO);
      }
      updateView();
    }

    el.rangeHeight.addEventListener('input', (e) => setHeight(parseInt(e.target.value, 10)));
    el.numHeight.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 60;
      setHeight(Math.max(60, Math.min(300, val)));
    });

    // Copy code
    el.btnCopy.addEventListener('click', async () => {
      const text = el.htmlCodeOutput.textContent;
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
      state.src = defaultState.src;
      state.alt = defaultState.alt;
      state.width = defaultState.width;
      state.height = defaultState.height;
      state.isBroken = false;
      state.keepAspect = true;
      el.checkAspect.checked = true;
      el.imgSrcSelect.selectedIndex = 0;
      updateView();
    });
  }

  setupEvents();
  updateView();
})();
