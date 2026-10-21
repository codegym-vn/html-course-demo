document.addEventListener('DOMContentLoaded', () => {
  const rangeMargin = document.getElementById('rangeMargin');
  const rangeBorder = document.getElementById('rangeBorder');
  const rangePadding = document.getElementById('rangePadding');
  const rangeWidth = document.getElementById('rangeWidth');
  const rangeHeight = document.getElementById('rangeHeight');

  const marginVal = document.getElementById('marginVal');
  const borderVal = document.getElementById('borderVal');
  const paddingVal = document.getElementById('paddingVal');
  const contentVal = document.getElementById('contentVal');

  const dtMarginTop = document.getElementById('dtMarginTop');
  const dtMarginRight = document.getElementById('dtMarginRight');
  const dtMarginBottom = document.getElementById('dtMarginBottom');
  const dtMarginLeft = document.getElementById('dtMarginLeft');

  const dtBorderTop = document.getElementById('dtBorderTop');
  const dtBorderRight = document.getElementById('dtBorderRight');
  const dtBorderBottom = document.getElementById('dtBorderBottom');
  const dtBorderLeft = document.getElementById('dtBorderLeft');

  const dtPadTop = document.getElementById('dtPadTop');
  const dtPadRight = document.getElementById('dtPadRight');
  const dtPadBottom = document.getElementById('dtPadBottom');
  const dtPadLeft = document.getElementById('dtPadLeft');

  const dtContentDim = document.getElementById('dtContentDim');
  const totalFormula = document.getElementById('totalFormula');

  const realElement = document.getElementById('realElement');
  const boxCodeOutput = document.getElementById('boxCodeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  function update() {
    const m = parseInt(rangeMargin.value, 10);
    const b = parseInt(rangeBorder.value, 10);
    const p = parseInt(rangePadding.value, 10);
    const w = parseInt(rangeWidth.value, 10);
    const h = parseInt(rangeHeight.value, 10);

    // Badges
    marginVal.textContent = `${m}px`;
    borderVal.textContent = `${b}px`;
    paddingVal.textContent = `${p}px`;
    contentVal.textContent = `${w} × ${h}px`;

    // DevTools labels
    dtMarginTop.textContent = m;
    dtMarginRight.textContent = m;
    dtMarginBottom.textContent = m;
    dtMarginLeft.textContent = m;

    dtBorderTop.textContent = b;
    dtBorderRight.textContent = b;
    dtBorderBottom.textContent = b;
    dtBorderLeft.textContent = b;

    dtPadTop.textContent = p;
    dtPadRight.textContent = p;
    dtPadBottom.textContent = p;
    dtPadLeft.textContent = p;

    dtContentDim.textContent = `${w} × ${h}`;

    // Real element styles
    realElement.style.width = `${w}px`;
    realElement.style.height = `${h}px`;
    realElement.style.padding = `${p}px`;
    realElement.style.borderWidth = `${b}px`;
    realElement.style.margin = `${m}px`;
    realElement.style.setProperty('--current-margin', `${m}px`);

    // Kích thước hiển thị thực tế (Rendered Box) và Không gian chiếm dụng (Total Space)
    const renderedW = w + (p * 2) + (b * 2);
    const renderedH = h + (p * 2) + (b * 2);
    const totalW = renderedW + (m * 2);
    const totalH = renderedH + (m * 2);

    totalFormula.textContent = `Hộp: ${renderedW} × ${renderedH}px | Chiếm dụng (+margin): ${totalW} × ${totalH}px`;

    // Code output
    boxCodeOutput.textContent = `.box { width: ${w}px; height: ${h}px; padding: ${p}px; border: ${b}px solid #eab308; margin: ${m}px; }`;
  }

  [rangeMargin, rangeBorder, rangePadding, rangeWidth, rangeHeight].forEach(slider => {
    slider.addEventListener('input', update);
  });

  btnReset.addEventListener('click', () => {
    rangeMargin.value = 20;
    rangeBorder.value = 4;
    rangePadding.value = 16;
    rangeWidth.value = 160;
    rangeHeight.value = 60;
    update();
  });

  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(boxCodeOutput.textContent).then(() => {
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => {
        btnCopy.textContent = originalText;
      }, 1500);
    });
  });

  update();
});
