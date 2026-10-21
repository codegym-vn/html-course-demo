document.addEventListener('DOMContentLoaded', () => {
  const modeButtons = document.querySelectorAll('.btn-mode');
  const rangeWidth = document.getElementById('rangeWidth');
  const rangeHeight = document.getElementById('rangeHeight');
  const rangeMargin = document.getElementById('rangeMargin');

  const widthBadge = document.getElementById('widthBadge');
  const heightBadge = document.getElementById('heightBadge');
  const marginBadge = document.getElementById('marginBadge');

  const hintWidth = document.getElementById('hintWidth');
  const hintHeight = document.getElementById('hintHeight');
  const hintMargin = document.getElementById('hintMargin');

  const matBreak = document.getElementById('matBreak');
  const matDim = document.getElementById('matDim');
  const matMargin = document.getElementById('matMargin');

  const targetElement = document.getElementById('targetElement');
  const behaviorBanner = document.getElementById('behaviorBanner');
  const displayCodeOutput = document.getElementById('displayCodeOutput');

  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  let currentMode = 'inline';

  function update() {
    const w = parseInt(rangeWidth.value, 10);
    const h = parseInt(rangeHeight.value, 10);
    const m = parseInt(rangeMargin.value, 10);

    widthBadge.textContent = `${w}px`;
    heightBadge.textContent = `${h}px`;
    marginBadge.textContent = `${m}px`;

    // Active state của buttons
    modeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });

    if (currentMode === 'inline') {
      // Hints
      hintWidth.textContent = 'Bị bỏ qua khi ở chế độ inline';
      hintWidth.className = 'field-hint hint-disabled';
      hintHeight.textContent = 'Bị bỏ qua khi ở chế độ inline';
      hintHeight.className = 'field-hint hint-disabled';
      hintMargin.textContent = 'margin dọc không đẩy dòng trong inline';
      hintMargin.className = 'field-hint hint-disabled';

      // Matrix
      matBreak.textContent = 'Không';
      matBreak.className = 'matrix-status status-no';
      matDim.textContent = 'Bị bỏ qua';
      matDim.className = 'matrix-status status-no';
      matMargin.textContent = 'Không đẩy dòng';
      matMargin.className = 'matrix-status status-no';

      // Element styles
      targetElement.className = 'flow-item target-item mode-inline';
      targetElement.style.width = '';
      targetElement.style.height = '';
      targetElement.style.margin = '0 4px';

      // Banner
      behaviorBanner.innerHTML = '<strong>Hành vi inline:</strong> Chảy liên tục trên cùng một dòng. Trình duyệt bỏ qua hoàn toàn thuộc tính width, height và margin trên/dưới.';

      // Code
      displayCodeOutput.textContent = `.target { display: inline; margin: 0 4px; /* width & height bị bỏ qua */ }`;
    } else if (currentMode === 'block') {
      // Hints
      hintWidth.textContent = 'Có hiệu lực (Khối riêng)';
      hintWidth.className = 'field-hint hint-active';
      hintHeight.textContent = 'Có hiệu lực';
      hintHeight.className = 'field-hint hint-active';
      hintMargin.textContent = 'Có hiệu lực (Đẩy dòng trên & dưới)';
      hintMargin.className = 'field-hint hint-active';

      // Matrix
      matBreak.textContent = 'Có (Xuống dòng mới)';
      matBreak.className = 'matrix-status status-yes';
      matDim.textContent = 'Đầy đủ hiệu lực';
      matDim.className = 'matrix-status status-yes';
      matMargin.textContent = 'Đầy đủ hiệu lực';
      matMargin.className = 'matrix-status status-yes';

      // Element styles
      targetElement.className = 'flow-item target-item mode-block';
      targetElement.style.width = `${w}px`;
      targetElement.style.height = `${h}px`;
      targetElement.style.margin = `${m}px 0`;

      // Banner
      behaviorBanner.innerHTML = '<strong>Hành vi block:</strong> Tự động ngắt dòng trước và sau để tạo khối riêng biệt. Nhận đầy đủ width, height và khoảng cách margin cả 4 phía.';

      // Code
      displayCodeOutput.textContent = `.target { display: block; width: ${w}px; height: ${h}px; margin: ${m}px 0; }`;
    } else if (currentMode === 'inline-block') {
      // Hints
      hintWidth.textContent = 'Có hiệu lực (Vẫn nằm cùng dòng)';
      hintWidth.className = 'field-hint hint-active';
      hintHeight.textContent = 'Có hiệu lực';
      hintHeight.className = 'field-hint hint-active';
      hintMargin.textContent = 'Có hiệu lực (Cả 4 hướng)';
      hintMargin.className = 'field-hint hint-active';

      // Matrix
      matBreak.textContent = 'Không (Nằm cùng dòng)';
      matBreak.className = 'matrix-status status-no';
      matDim.textContent = 'Đầy đủ hiệu lực';
      matDim.className = 'matrix-status status-yes';
      matMargin.textContent = 'Đầy đủ hiệu lực';
      matMargin.className = 'matrix-status status-yes';

      // Element styles
      targetElement.className = 'flow-item target-item mode-inline-block';
      targetElement.style.width = `${w}px`;
      targetElement.style.height = `${h}px`;
      targetElement.style.margin = `${m}px 6px`;

      // Banner
      behaviorBanner.innerHTML = '<strong>Hành vi inline-block:</strong> Kết hợp ưu điểm cả hai: Vẫn giữ vị trí trên cùng dòng như inline, nhưng tùy biến được width, height và margin như block.';

      // Code
      displayCodeOutput.textContent = `.target { display: inline-block; width: ${w}px; height: ${h}px; margin: ${m}px 6px; }`;
    }
  }

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentMode = btn.dataset.mode;
      update();
    });
  });

  [rangeWidth, rangeHeight, rangeMargin].forEach(slider => {
    slider.addEventListener('input', update);
  });

  btnReset.addEventListener('click', () => {
    currentMode = 'inline';
    rangeWidth.value = 110;
    rangeHeight.value = 45;
    rangeMargin.value = 14;
    update();
  });

  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(displayCodeOutput.textContent).then(() => {
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => {
        btnCopy.textContent = originalText;
      }, 1500);
    });
  });

  update();
});
