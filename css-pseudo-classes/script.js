document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panelInteractive = document.getElementById('panelInteractive');
  const panelNth = document.getElementById('panelNth');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isInteractive = btn.dataset.tab === 'interactive';
      panelInteractive.classList.toggle('active', isInteractive);
      panelNth.classList.toggle('active', !isInteractive);
    });
  });

  // Panel 1: Interactive States
  const stateButtons = document.querySelectorAll('.btn-state');
  const targetBtn = document.getElementById('targetBtn');
  const targetInput = document.getElementById('targetInput');
  const stateBadge = document.getElementById('stateBadge');
  const stateTitle = document.getElementById('stateTitle');
  const stateDesc = document.getElementById('stateDesc');
  const stateCodeOutput = document.getElementById('stateCodeOutput');
  const btnCopyState = document.getElementById('btnCopyState');

  let activeAnimTimeout = null;

  const stateDetails = {
    normal: {
      badge: 'Bình thường',
      title: 'Trạng thái mặc định',
      desc: 'Phần tử khi chưa có tương tác từ người dùng. Sử dụng định dạng thông thường của class.',
      code: '.btn-demo { background-color: #0284c7; color: #fff; }'
    },
    hover: {
      badge: ':hover',
      title: 'Kích hoạt khi rê chuột',
      desc: 'Áp dụng kiểu dáng khi người dùng di con trỏ chuột lên trên phần tử (đổi màu, đổ bóng, hiệu ứng nhấc nhẹ nút).',
      code: '.btn-demo:hover { background-color: #0369a1; transform: translateY(-2px); box-shadow: 0 4px 14px rgba(2,132,199,0.45); }'
    },
    focus: {
      badge: ':focus',
      title: 'Kích hoạt khi phần tử được tiêu điểm',
      desc: 'Áp dụng khi người dùng nhấp chuột vào ô nhập liệu hoặc dùng phím Tab chuyển đến. Rất quan trọng cho trải nghiệm người dùng và tiếp cận (Accessibility).',
      code: '.input-demo:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56,189,248,0.35); }'
    },
    active: {
      badge: ':active',
      title: 'Kích hoạt trong lúc đang nhấn giữ',
      desc: 'Áp dụng ngay trong khoảnh khắc người dùng nhấn giữ chuột trái xuống phần tử (tạo cảm giác nút lún xuống khi bấm).',
      code: '.btn-demo:active { transform: scale(0.95); background-color: #075985; }'
    }
  };

  function updateStateUI(state) {
    stateButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.state === state);
    });

    const info = stateDetails[state];
    stateBadge.textContent = info.badge;
    stateTitle.textContent = info.title;
    stateDesc.textContent = info.desc;
    stateCodeOutput.textContent = info.code;
  }

  function clearBtnAnimations() {
    if (activeAnimTimeout) {
      clearTimeout(activeAnimTimeout);
      activeAnimTimeout = null;
    }
    targetBtn.classList.remove('anim-sim-hover', 'anim-sim-active');
  }

  // Trigger animation mô phỏng khi người dùng bấm các nút bên trái
  function triggerSimulation(state) {
    clearBtnAnimations();
    updateStateUI(state);

    if (state === 'hover') {
      targetInput.blur();
      void targetBtn.offsetWidth; // Trigger reflow
      targetBtn.classList.add('anim-sim-hover');
      activeAnimTimeout = setTimeout(() => {
        targetBtn.classList.remove('anim-sim-hover');
        updateStateUI('normal');
      }, 1300);
    } else if (state === 'active') {
      targetInput.blur();
      void targetBtn.offsetWidth; // Trigger reflow
      targetBtn.classList.add('anim-sim-active');
      activeAnimTimeout = setTimeout(() => {
        targetBtn.classList.remove('anim-sim-active');
        updateStateUI('normal');
      }, 450);
    } else if (state === 'focus') {
      targetInput.focus();
    } else if (state === 'normal') {
      targetInput.blur();
    }
  }

  stateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      triggerSimulation(btn.dataset.state);
    });
  });

  // Tương tác chuột và bàn phím THẬT trên các phần tử demo
  targetBtn.addEventListener('mouseenter', () => {
    if (!targetBtn.classList.contains('anim-sim-hover') && !targetBtn.classList.contains('anim-sim-active')) {
      updateStateUI('hover');
    }
  });

  targetBtn.addEventListener('mouseleave', () => {
    if (!targetBtn.classList.contains('anim-sim-hover') && !targetBtn.classList.contains('anim-sim-active')) {
      updateStateUI('normal');
    }
  });

  targetBtn.addEventListener('mousedown', () => {
    clearBtnAnimations();
    updateStateUI('active');
  });

  targetBtn.addEventListener('mouseup', () => {
    updateStateUI('hover');
  });

  targetInput.addEventListener('focus', () => {
    clearBtnAnimations();
    updateStateUI('focus');
  });

  targetInput.addEventListener('blur', () => {
    updateStateUI('normal');
  });

  btnCopyState.addEventListener('click', () => {
    navigator.clipboard.writeText(stateCodeOutput.textContent).then(() => {
      const orig = btnCopyState.textContent;
      btnCopyState.textContent = 'Copied!';
      setTimeout(() => btnCopyState.textContent = orig, 1500);
    });
  });

  // Panel 2: nth-child Grid
  const nthGrid = document.getElementById('nthGrid');
  const presetButtons = document.querySelectorAll('.btn-preset');
  const nthFormulaInput = document.getElementById('nthFormulaInput');
  const btnApplyNth = document.getElementById('btnApplyNth');
  const matchedIndices = document.getElementById('matchedIndices');
  const mathExplain = document.getElementById('mathExplain');
  const nthCodeOutput = document.getElementById('nthCodeOutput');
  const btnCopyNth = document.getElementById('btnCopyNth');

  // Khởi tạo 10 items
  for (let i = 1; i <= 10; i++) {
    const item = document.createElement('div');
    item.className = 'nth-item';
    item.dataset.index = i;
    item.innerHTML = `<span class="item-num">${i}</span><span class="item-label">Item #${i}</span>`;
    nthGrid.appendChild(item);
  }

  function applyNthFormula(formula) {
    const cleanFormula = formula.trim().toLowerCase();
    nthFormulaInput.value = cleanFormula;

    presetButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.formula === cleanFormula);
    });

    const allItems = Array.from(nthGrid.querySelectorAll('.nth-item'));
    allItems.forEach(item => item.classList.remove('matched'));

    let matchedItems = [];
    try {
      matchedItems = Array.from(nthGrid.querySelectorAll(`.nth-item:nth-child(${cleanFormula})`));
    } catch (e) {
      matchedIndices.textContent = 'Công thức không hợp lệ';
      mathExplain.textContent = 'Vui lòng nhập công thức chuẩn CSS: odd, even, hoặc An + B (ví dụ: 2n, 3n+1).';
      return;
    }

    matchedItems.forEach(item => item.classList.add('matched'));

    const indices = matchedItems.map(item => item.dataset.index);
    if (indices.length > 0) {
      matchedIndices.textContent = indices.join(', ');
    } else {
      matchedIndices.textContent = 'Không có phần tử nào khớp (trong khoảng 1 - 10)';
    }

    // Giải thích toán học
    if (cleanFormula === 'odd') {
      mathExplain.textContent = 'Khớp các số thứ tự lẻ: 1, 3, 5, 7, 9.';
    } else if (cleanFormula === 'even') {
      mathExplain.textContent = 'Khớp các số thứ tự chẵn: 2, 4, 6, 8, 10.';
    } else {
      mathExplain.textContent = `Công thức :nth-child(${cleanFormula}) được trình duyệt tính toán bằng cách thay lần lượt n = 0, 1, 2, 3... vào biểu thức.`;
    }

    nthCodeOutput.textContent = `.item:nth-child(${cleanFormula}) { background-color: #0284c7; color: #fff; }`;
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyNthFormula(btn.dataset.formula);
    });
  });

  btnApplyNth.addEventListener('click', () => {
    applyNthFormula(nthFormulaInput.value);
  });

  nthFormulaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyNthFormula(nthFormulaInput.value);
    }
  });

  btnCopyNth.addEventListener('click', () => {
    navigator.clipboard.writeText(nthCodeOutput.textContent).then(() => {
      const orig = btnCopyNth.textContent;
      btnCopyNth.textContent = 'Copied!';
      setTimeout(() => btnCopyNth.textContent = orig, 1500);
    });
  });

  // Khởi tạo ban đầu
  updateStateUI('normal');
  applyNthFormula('odd');
});
