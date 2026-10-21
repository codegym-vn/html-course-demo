document.addEventListener('DOMContentLoaded', () => {
  const posButtons = document.querySelectorAll('.btn-pos');
  const rangeTop = document.getElementById('rangeTop');
  const rangeLeft = document.getElementById('rangeLeft');
  const topBadge = document.getElementById('topBadge');
  const leftBadge = document.getElementById('leftBadge');
  const coordFields = document.querySelectorAll('.coord-field');
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
      desc: 'Phần tử hiển thị theo trật tự thông thường của HTML. Các thuộc tính <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code>, <code>z-index</code> bị bỏ qua.'
    },
    relative: {
      badge: 'relative (Tương đối)',
      title: 'Dịch chuyển so với vị trí gốc',
      desc: 'Phần tử dịch đi theo <code>top</code>/<code>left</code> tính từ vị trí gốc (viền nét đứt). Chỗ gốc vẫn được giữ nên khối #2 không bị dồn lên.'
    },
    absolute: {
      badge: 'absolute (Tuyệt đối)',
      title: 'Nhấc hoàn toàn khỏi luồng',
      desc: 'Phần tử không còn chiếm chỗ: thẻ cha co lại và khối #2 dồn lên. Tọa độ tính theo tổ tiên gần nhất có <code>position</code> khác <code>static</code>.'
    },
    fixed: {
      badge: 'fixed (Cố định)',
      title: 'Ghim cố định theo khung nhìn',
      desc: 'Bị nhấc khỏi luồng và ghim vào khung nhìn (viewport). Cuộn khung tài liệu: phần tử vẫn đứng yên. Trong demo, khung bên phải đóng vai trò viewport.'
    }
  };

  // Viền vị trí gốc chỉ có ý nghĩa với relative: kích thước bằng target, nằm ở vị trí tĩnh ban đầu
  function syncGhost() {
    if (currentPos !== 'relative') {
      ghostHolder.style.display = 'none';
      return;
    }
    ghostHolder.style.display = 'block';
    ghostHolder.style.width = `${targetBox.offsetWidth}px`;
    ghostHolder.style.height = `${targetBox.offsetHeight}px`;
  }

  function update() {
    const t = parseInt(rangeTop.value, 10);
    const l = parseInt(rangeLeft.value, 10);

    topBadge.textContent = `${t}px`;
    leftBadge.textContent = `${l}px`;

    posButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pos === currentPos);
    });

    // top/left vô hiệu với static
    coordFields.forEach(field => field.classList.toggle('is-ignored', currentPos === 'static'));

    const isParentRel = checkParentRel.checked;
    parentBox.classList.toggle('has-relative', isParentRel);
    parentBox.style.position = isParentRel ? 'relative' : 'static';

    if (isParentRel) {
      parentLabel.textContent = '<div class="parent-box"> (position: relative)';
      parentHint.textContent = 'Thẻ cha (.parent-box) làm mốc tọa độ cho absolute.';
    } else {
      parentLabel.textContent = '<div class="parent-box"> (position: static - không làm mốc)';
      parentHint.textContent = 'Thẻ cha là static: absolute tìm tiếp lên trên và lấy góc trên trái của trang (khung tài liệu) làm mốc, vẫn cuộn theo trang.';
    }

    const exp = posExplanations[currentPos];
    posBadge.textContent = exp.badge;
    posTitle.textContent = exp.title;
    posDesc.innerHTML = exp.desc;

    // Mọi chế độ đều dùng giá trị position thật của CSS
    targetBox.style.position = currentPos;
    if (currentPos === 'static') {
      targetBox.style.top = '';
      targetBox.style.left = '';
      targetCoords.textContent = 'top/left bị bỏ qua';
      posCodeOutput.textContent = '.target { position: static; }';
    } else {
      targetBox.style.top = `${t}px`;
      targetBox.style.left = `${l}px`;
      targetCoords.textContent = `top: ${t}px, left: ${l}px`;
      posCodeOutput.textContent = `.target { position: ${currentPos}; top: ${t}px; left: ${l}px; }`;
    }

    syncGhost();
  }

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
    const text = posCodeOutput.textContent;
    const done = () => {
      const orig = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => { btnCopy.textContent = orig; }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => {});
    } else {
      // Dự phòng cho file:// hoặc iframe chặn clipboard API
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      if (document.execCommand('copy')) done();
      ta.remove();
    }
  });

  update();
});
