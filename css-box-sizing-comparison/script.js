document.addEventListener('DOMContentLoaded', () => {
  const rangeWidth = document.getElementById('rangeWidth');
  const rangePadding = document.getElementById('rangePadding');
  const rangeBorder = document.getElementById('rangeBorder');

  const widthBadge = document.getElementById('widthBadge');
  const padBadge = document.getElementById('padBadge');
  const borderBadge = document.getElementById('borderBadge');

  const boundaryContent = document.getElementById('boundaryContent');
  const boundaryBorder = document.getElementById('boundaryBorder');
  const boundaryVal1 = document.getElementById('boundaryVal1');
  const boundaryVal2 = document.getElementById('boundaryVal2');

  const boxContent = document.getElementById('boxContent');
  const boxBorder = document.getElementById('boxBorder');

  const actualWidthContent = document.getElementById('actualWidthContent');
  const actualWidthBorder = document.getElementById('actualWidthBorder');
  const formulaContent = document.getElementById('formulaContent');
  const formulaBorder = document.getElementById('formulaBorder');

  const btnReset = document.getElementById('btnReset');

  function update() {
    const w = parseInt(rangeWidth.value, 10);
    const p = parseInt(rangePadding.value, 10);
    const b = parseInt(rangeBorder.value, 10);

    // Badges
    widthBadge.textContent = `${w}px`;
    padBadge.textContent = `${p}px`;
    borderBadge.textContent = `${b}px`;

    // Boundary guide markers
    boundaryContent.style.width = `${w}px`;
    boundaryBorder.style.width = `${w}px`;
    boundaryVal1.textContent = `${w}px`;
    boundaryVal2.textContent = `${w}px`;

    // content-box calculations
    boxContent.style.width = `${w}px`;
    boxContent.style.padding = `${p}px`;
    boxContent.style.borderWidth = `${b}px`;

    const actualW_CB = w + (p * 2) + (b * 2);
    const diff = actualW_CB - w;
    if (diff > 0) {
      actualWidthContent.textContent = `${actualW_CB}px (Phình to +${diff}px)`;
    } else {
      actualWidthContent.textContent = `${actualW_CB}px`;
    }
    formulaContent.textContent = `${w}px (w) + ${p * 2}px (padding) + ${b * 2}px (border) = ${actualW_CB}px`;

    // border-box calculations
    boxBorder.style.width = `${w}px`;
    boxBorder.style.padding = `${p}px`;
    boxBorder.style.borderWidth = `${b}px`;

    const innerContentW = Math.max(0, w - (p * 2) - (b * 2));
    actualWidthBorder.textContent = `${w}px (Chuẩn khít)`;
    formulaBorder.textContent = `Giữ nguyên ${w}px (Vùng content co lại còn ${innerContentW}px)`;
  }

  [rangeWidth, rangePadding, rangeBorder].forEach(slider => {
    slider.addEventListener('input', update);
  });

  btnReset.addEventListener('click', () => {
    rangeWidth.value = 240;
    rangePadding.value = 20;
    rangeBorder.value = 6;
    update();
  });

  update();
});
