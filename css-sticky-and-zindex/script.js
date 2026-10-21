document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panelSticky = document.getElementById('panelSticky');
  const panelZIndex = document.getElementById('panelZIndex');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isSticky = btn.dataset.tab === 'sticky';
      panelSticky.classList.toggle('active', isSticky);
      panelZIndex.classList.toggle('active', !isSticky);
    });
  });

  // Tab 1: Sticky
  const rangeStickyTop = document.getElementById('rangeStickyTop');
  const stickyTopBadge = document.getElementById('stickyTopBadge');
  const headerA = document.getElementById('headerA');
  const headerB = document.getElementById('headerB');
  const stickyCodeOutput = document.getElementById('stickyCodeOutput');
  const btnCopySticky = document.getElementById('btnCopySticky');

  function updateSticky() {
    const val = parseInt(rangeStickyTop.value, 10);
    stickyTopBadge.textContent = `${val}px`;
    headerA.style.top = `${val}px`;
    headerB.style.top = `${val}px`;
    stickyCodeOutput.textContent = `.sticky-header { position: sticky; top: ${val}px; }`;
  }

  rangeStickyTop.addEventListener('input', updateSticky);

  btnCopySticky.addEventListener('click', () => {
    navigator.clipboard.writeText(stickyCodeOutput.textContent).then(() => {
      const orig = btnCopySticky.textContent;
      btnCopySticky.textContent = 'Copied!';
      setTimeout(() => btnCopySticky.textContent = orig, 1500);
    });
  });

  // Tab 2: Z-Index
  const rangeZ1 = document.getElementById('rangeZ1');
  const rangeZ2 = document.getElementById('rangeZ2');
  const rangeZ3 = document.getElementById('rangeZ3');

  const z1Badge = document.getElementById('z1Badge');
  const z2Badge = document.getElementById('z2Badge');
  const z3Badge = document.getElementById('z3Badge');

  const boxZ1 = document.getElementById('boxZ1');
  const boxZ2 = document.getElementById('boxZ2');
  const boxZ3 = document.getElementById('boxZ3');

  const tagZ1 = document.getElementById('tagZ1');
  const tagZ2 = document.getElementById('tagZ2');
  const tagZ3 = document.getElementById('tagZ3');

  const zCodeOutput = document.getElementById('zCodeOutput');
  const btnCopyZ = document.getElementById('btnCopyZ');

  function updateZIndex() {
    const z1 = parseInt(rangeZ1.value, 10);
    const z2 = parseInt(rangeZ2.value, 10);
    const z3 = parseInt(rangeZ3.value, 10);

    z1Badge.textContent = z1;
    z2Badge.textContent = z2;
    z3Badge.textContent = z3;

    tagZ1.textContent = `z-index: ${z1}`;
    tagZ2.textContent = `z-index: ${z2}`;
    tagZ3.textContent = `z-index: ${z3}`;

    boxZ1.style.zIndex = z1;
    boxZ2.style.zIndex = z2;
    boxZ3.style.zIndex = z3;

    zCodeOutput.textContent = `#box1 { z-index: ${z1}; }  #box2 { z-index: ${z2}; }  #box3 { z-index: ${z3}; }`;
  }

  [rangeZ1, rangeZ2, rangeZ3].forEach(slider => {
    slider.addEventListener('input', updateZIndex);
  });

  btnCopyZ.addEventListener('click', () => {
    navigator.clipboard.writeText(zCodeOutput.textContent).then(() => {
      const orig = btnCopyZ.textContent;
      btnCopyZ.textContent = 'Copied!';
      setTimeout(() => btnCopyZ.textContent = orig, 1500);
    });
  });

  // Khởi tạo
  updateSticky();
  updateZIndex();
});
