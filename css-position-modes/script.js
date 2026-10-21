document.addEventListener('DOMContentLoaded', () => {
  const posButtons = document.querySelectorAll('.btn-pos');
  const coordFields = document.querySelectorAll('.coord-field');
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
  const flowValue = document.getElementById('flowValue');
  const refValue = document.getElementById('refValue');
  const scrollHint = document.getElementById('scrollHint');
  const posCodeOutput = document.getElementById('posCodeOutput');
  const viewportFrame = document.getElementById('viewportFrame');
  const viewportArea = document.getElementById('viewportArea');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const DEFAULTS = { pos: 'static', top: 30, left: 40, parentRel: true };
  let currentPos = DEFAULTS.pos;

  const posInfo = {
    static: {
      title: 'Nằm trong luồng tự nhiên',
      desc: 'Hiển thị theo thứ tự HTML. <code class="font-mono text-sky-400">top</code>, <code class="font-mono text-sky-400">left</code>, <code class="font-mono text-sky-400">z-index</code> bị bỏ qua.',
      inFlow: true
    },
    relative: {
      title: 'Dịch so với vị trí gốc',
      desc: 'Dịch theo offset tính từ vị trí gốc (viền nét đứt). Chỗ gốc vẫn được giữ nên khối #2 không dồn lên.',
      inFlow: true
    },
    absolute: {
      title: 'Nhấc khỏi luồng',
      desc: 'Không còn chiếm chỗ: thẻ cha co lại, khối #2 dồn lên. Mốc là tổ tiên gần nhất có <code class="font-mono text-sky-400">position</code> khác <code class="font-mono text-sky-400">static</code>.',
      inFlow: false
    },
    fixed: {
      title: 'Ghim theo khung nhìn',
      desc: 'Nhấc khỏi luồng và ghim vào viewport: cuộn trang, phần tử vẫn đứng yên. Trong demo, khung bên phải đóng vai viewport.',
      inFlow: false
    }
  };

  // Xác định phần tử làm mốc tọa độ (containing block) để tô viền
  function getReference(isParentRel) {
    switch (currentPos) {
      case 'relative': return { el: ghostHolder, label: 'Vị trí gốc của chính nó' };
      case 'absolute':
        return isParentRel
          ? { el: parentBox, label: 'Thẻ cha .parent-box' }
          : { el: viewportArea, label: 'Trang (khung tài liệu)' };
      case 'fixed': return { el: viewportFrame, label: 'Khung nhìn (viewport)' };
      default: return { el: null, label: 'Không có' };
    }
  }

  // Viền vị trí gốc chỉ có ý nghĩa với relative
  function syncGhost() {
    const show = currentPos === 'relative';
    ghostHolder.classList.toggle('hidden', !show);
    if (show) {
      ghostHolder.style.width = `${targetBox.offsetWidth}px`;
      ghostHolder.style.height = `${targetBox.offsetHeight}px`;
    }
  }

  function update() {
    const t = parseInt(rangeTop.value, 10);
    const l = parseInt(rangeLeft.value, 10);
    const isParentRel = checkParentRel.checked;
    const info = posInfo[currentPos];
    const isStatic = currentPos === 'static';

    topBadge.textContent = `${t}px`;
    leftBadge.textContent = `${l}px`;

    posButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.pos === currentPos));
    });
    coordFields.forEach(field => { field.dataset.ignored = String(isStatic); });

    // Thẻ cha
    parentBox.style.position = isParentRel ? 'relative' : 'static';
    parentBox.dataset.rel = String(isParentRel);
    parentLabel.textContent = `.parent-box { position: ${isParentRel ? 'relative' : 'static'} }`;
    parentHint.textContent = isParentRel
      ? 'Thẻ cha là mốc tọa độ cho absolute.'
      : 'Thẻ cha static: absolute tìm tiếp lên trên, lấy trang (khung tài liệu) làm mốc và cuộn theo trang.';

    // Giải thích
    posBadge.textContent = currentPos;
    posTitle.textContent = info.title;
    posDesc.innerHTML = info.desc;
    flowValue.textContent = info.inFlow ? 'Có' : 'Không (nhấc khỏi luồng)';
    flowValue.className = `font-semibold ${info.inFlow ? 'text-emerald-400' : 'text-rose-400'}`;

    // Mốc tọa độ
    const ref = getReference(isParentRel);
    refValue.textContent = ref.label;
    [ghostHolder, parentBox, viewportArea, viewportFrame].forEach(el => {
      el.dataset.ref = String(el === ref.el);
    });
    scrollHint.textContent = currentPos === 'fixed' ? 'Cuộn khung: .target đứng yên' : 'Cuộn khung để thử';

    // Áp dụng position thật của CSS
    targetBox.style.position = currentPos;
    if (isStatic) {
      targetBox.style.top = '';
      targetBox.style.left = '';
      targetCoords.textContent = 'top/left bị bỏ qua';
    } else {
      targetBox.style.top = `${t}px`;
      targetBox.style.left = `${l}px`;
      targetCoords.textContent = `top: ${t}px; left: ${l}px`;
    }

    const targetRule = isStatic
      ? '.target     { position: static; }'
      : `.target     { position: ${currentPos}; top: ${t}px; left: ${l}px; }`;
    posCodeOutput.textContent = `.parent-box { position: ${isParentRel ? 'relative' : 'static'}; }\n${targetRule}`;

    syncGhost();
  }

  posButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentPos = btn.dataset.pos;
      update();
    });
  });

  rangeTop.addEventListener('input', update);
  rangeLeft.addEventListener('input', update);
  checkParentRel.addEventListener('change', update);

  btnReset.addEventListener('click', () => {
    currentPos = DEFAULTS.pos;
    rangeTop.value = DEFAULTS.top;
    rangeLeft.value = DEFAULTS.left;
    checkParentRel.checked = DEFAULTS.parentRel;
    viewportArea.scrollTop = 0;
    update();
  });

  btnCopy.addEventListener('click', () => {
    const text = posCodeOutput.textContent;
    const done = () => {
      btnCopy.textContent = 'Copied';
      setTimeout(() => { btnCopy.textContent = 'Copy'; }, 1500);
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
