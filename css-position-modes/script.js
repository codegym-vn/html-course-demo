document.addEventListener('DOMContentLoaded', () => {
  const posButtons = document.querySelectorAll('.btn-pos');
  const rangeTop = document.getElementById('rangeTop');
  const rangeLeft = document.getElementById('rangeLeft');
  const topBadge = document.getElementById('topBadge');
  const leftBadge = document.getElementById('leftBadge');
  const checkParentRel = document.getElementById('checkParentRel');
  const parentHint = document.getElementById('parentHint');
  const parentBox = document.getElementById('parentBox');
  const parentLabel = document.getElementById('parentLabel');
  const ghostHolder = document.getElementById('ghostHolder');
  const targetBox = document.getElementById('targetBox');
  const targetCoords = document.getElementById('targetCoords');
  const posBadge = document.getElementById('posBadge');
  const posTitle = document.getElementById('posTitle');
  const posDesc = document.getElementById('posDesc');
  const posCodeOutput = document.getElementById('posCodeOutput');
  const viewportArea = document.getElementById('viewportArea');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  let currentPos = 'static';

  const posExplanations = {
    static: {
      badge: 'static (Mặc định)',
      title: 'Nằm trong luồng tự nhiên',
      desc: 'Phần tử hiển thị theo trật tự thông thường của HTML. Các thuộc tính <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code>, <code>z-index</code> bị bỏ qua hoàn toàn.',
    },
    relative: {
      badge: 'relative (Tương đối)',
      title: 'Dịch chuyển so với vị trí gốc',
      desc: 'Phần tử trôi khỏi vị trí ban đầu theo <code>top</code>/<code>left</code>, nhưng vị trí gốc ban đầu của nó vẫn được giữ chỗ (các phần tử khác không bị dồn lên).',
    },
    absolute: {
      badge: 'absolute (Tuyệt đối)',
      title: 'Nhấc hoàn toàn khỏi luồng',
      desc: 'Phần tử không còn chiếm chỗ trong luồng. Tọa độ được tính theo phần tử tổ tiên gần nhất có <code>position</code> khác static (ở đây là <code>.parent-box</code>).',
    },
    fixed: {
      badge: 'fixed (Cố định)',
      title: 'Ghim cố định theo Viewport',
      desc: 'Bị nhấc khỏi luồng và ghim chặt vào khung nhìn trình duyệt. Khi bạn cuộn trang lên xuống, phần tử vẫn đứng yên một chỗ.',
    }
  };

  function update() {
    const t = parseInt(rangeTop.value, 10);
    const l = parseInt(rangeLeft.value, 10);

    topBadge.textContent = `${t}px`;
    leftBadge.textContent = `${l}px`;

    posButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pos === currentPos);
    });

    const isParentRel = checkParentRel.checked;
    parentBox.classList.toggle('has-relative', isParentRel);
    parentBox.style.position = isParentRel ? 'relative' : 'static';

    if (isParentRel) {
      parentLabel.textContent = '<div class="parent-box"> (position: relative)';
      parentHint.textContent = 'Thẻ cha (.parent-box) làm mốc tọa độ cho absolute.';
    } else {
      parentLabel.textContent = '<div class="parent-box"> (position: static - Không làm mốc)';
      parentHint.textContent = 'Thẻ cha là static -> absolute sẽ lấy khung nhìn Viewport làm mốc tọa độ!';
    }

    const exp = posExplanations[currentPos];
    posBadge.textContent = exp.badge;
    posTitle.textContent = exp.title;
    posDesc.innerHTML = exp.desc;

    // Reset inline styles
    targetBox.style.top = '';
    targetBox.style.left = '';
    targetBox.style.transform = '';

    if (currentPos === 'static') {
      ghostHolder.style.display = 'none';
      targetBox.style.position = 'static';
      targetCoords.textContent = 'top/left bị bỏ qua';
      posCodeOutput.textContent = '.target { position: static; }';
    } else if (currentPos === 'relative') {
      ghostHolder.style.display = 'block';
      targetBox.style.position = 'relative';
      targetBox.style.top = `${t}px`;
      targetBox.style.left = `${l}px`;
      targetCoords.textContent = `top: ${t}px, left: ${l}px`;
      posCodeOutput.textContent = `.target { position: relative; top: ${t}px; left: ${l}px; }`;
    } else if (currentPos === 'absolute') {
      ghostHolder.style.display = 'block';
      targetBox.style.position = 'absolute';
      targetBox.style.top = `${t}px`;
      targetBox.style.left = `${l}px`;
      targetCoords.textContent = `top: ${t}px, left: ${l}px`;
      posCodeOutput.textContent = `.target { position: absolute; top: ${t}px; left: ${l}px; }`;
    } else if (currentPos === 'fixed') {
      ghostHolder.style.display = 'block';
      targetBox.style.position = 'absolute'; // Dùng absolute neo theo viewportArea để mô phỏng fixed trong khung demo
      syncFixedPosition();
      targetCoords.textContent = `fixed: top: ${t}px, left: ${l}px`;
      posCodeOutput.textContent = `.target { position: fixed; top: ${t}px; left: ${l}px; }`;
    }
  }

  // Giữ Target Box ghim cố định khi cuộn mô phỏng position: fixed
  function syncFixedPosition() {
    if (currentPos !== 'fixed') return;
    const t = parseInt(rangeTop.value, 10);
    const l = parseInt(rangeLeft.value, 10);
    const scrollTop = viewportArea.scrollTop;

    // Ghim theo tọa độ của viewportArea
    const viewportRect = viewportArea.getBoundingClientRect();
    const parentRect = parentBox.getBoundingClientRect();

    const offsetY = (viewportRect.top - parentRect.top) + scrollTop + Math.max(10, t);
    const offsetX = (viewportRect.left - parentRect.left) + Math.max(10, l);

    targetBox.style.top = `${offsetY}px`;
    targetBox.style.left = `${offsetX}px`;
  }

  viewportArea.addEventListener('scroll', () => {
    if (currentPos === 'fixed') {
      syncFixedPosition();
    }
  });

  posButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentPos = btn.dataset.pos;
      update();
    });
  });

  [rangeTop, rangeLeft].forEach(slider => {
    slider.addEventListener('input', update);
  });

  checkParentRel.addEventListener('change', update);

  btnReset.addEventListener('click', () => {
    currentPos = 'static';
    rangeTop.value = 30;
    rangeLeft.value = 40;
    checkParentRel.checked = true;
    viewportArea.scrollTop = 0;
    update();
  });

  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(posCodeOutput.textContent).then(() => {
      const orig = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => btnCopy.textContent = orig, 1500);
    });
  });

  update();
});
