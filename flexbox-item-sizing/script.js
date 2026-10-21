document.addEventListener('DOMContentLoaded', () => {
  const rangeWidth = document.getElementById('rangeWidth');
  const widthBadge = document.getElementById('widthBadge');
  const tabs = document.querySelectorAll('.tab');
  const rangeGrow = document.getElementById('rangeGrow');
  const rangeShrink = document.getElementById('rangeShrink');
  const rangeBasis = document.getElementById('rangeBasis');
  const growBadge = document.getElementById('growBadge');
  const shrinkBadge = document.getElementById('shrinkBadge');
  const basisBadge = document.getElementById('basisBadge');
  const presetButtons = document.querySelectorAll('.preset');
  const container = document.getElementById('container');
  const itemEls = [...container.querySelectorAll('.item')];
  const freeBadge = document.getElementById('freeBadge');
  const calcBody = document.getElementById('calcBody');
  const formula = document.getElementById('formula');
  const codeOutput = document.getElementById('codeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const NAMES = ['A', 'B', 'C'];
  const GAP = 8;
  const MIN_SIZE = 4; // viền 2px x 2: item border-box không thể nhỏ hơn

  const defaultItems = () => [0, 1, 2].map(() => ({ grow: 0, shrink: 1, basis: 100 }));
  const PRESETS = {
    equal: [{ grow: 1, shrink: 1, basis: 0 }, { grow: 1, shrink: 1, basis: 0 }, { grow: 1, shrink: 1, basis: 0 }],
    double: [{ grow: 1, shrink: 1, basis: 0 }, { grow: 2, shrink: 1, basis: 0 }, { grow: 1, shrink: 1, basis: 0 }],
    sidebar: [{ grow: 0, shrink: 0, basis: 160 }, { grow: 1, shrink: 1, basis: 0 }, { grow: 0, shrink: 1, basis: 100 }]
  };

  const state = { width: 480, active: 0, items: defaultItems() };

  const round = (n) => Math.round(n * 10) / 10;
  const signed = (n) => (n > 0 ? '+' : n < 0 ? '−' : '') + round(Math.abs(n));

  // Mô phỏng thuật toán chia/co của Flexbox (đơn giản hóa: không có max-width, min = MIN_SIZE)
  function compute(inner) {
    const items = state.items;
    const sumBasis = items.reduce((s, it) => s + it.basis, 0);
    const free = inner - GAP * (items.length - 1) - sumBasis;
    const sizes = items.map(it => it.basis);

    if (free >= 0) {
      const sumGrow = items.reduce((s, it) => s + it.grow, 0);
      if (sumGrow > 0) items.forEach((it, i) => { sizes[i] += free * it.grow / sumGrow; });
      return { free, sizes, mode: 'grow', sumGrow };
    }

    // Co: chia phần thiếu theo trọng số shrink x basis; item chạm MIN_SIZE thì đóng băng và tính lại
    const frozen = new Set();
    let sumWeight = 0;
    for (let pass = 0; pass < items.length; pass++) {
      const used = [...frozen].reduce((s, i) => s + sizes[i], 0);
      const open = items.map((_, i) => i).filter(i => !frozen.has(i));
      const remaining = inner - GAP * (items.length - 1) - used - open.reduce((s, i) => s + items[i].basis, 0);
      sumWeight = open.reduce((s, i) => s + items[i].shrink * items[i].basis, 0);
      if (remaining >= 0 || sumWeight === 0) {
        open.forEach(i => { sizes[i] = items[i].basis; });
        break;
      }
      let violated = false;
      open.forEach(i => {
        const t = items[i].basis + remaining * (items[i].shrink * items[i].basis) / sumWeight;
        sizes[i] = t;
        if (t < MIN_SIZE) { sizes[i] = MIN_SIZE; frozen.add(i); violated = true; }
      });
      if (!violated) break;
    }
    return { free, sizes, mode: 'shrink', sumWeight: items.reduce((s, it) => s + it.shrink * it.basis, 0) };
  }

  function renderControls() {
    const it = state.items[state.active];
    tabs.forEach(t => t.setAttribute('aria-selected', String(+t.dataset.item === state.active)));
    rangeGrow.value = it.grow;
    rangeShrink.value = it.shrink;
    rangeBasis.value = it.basis;
    growBadge.textContent = it.grow;
    shrinkBadge.textContent = it.shrink;
    basisBadge.textContent = `${it.basis}px`;
    widthBadge.textContent = `${state.width}px`;
    itemEls.forEach((el, i) => el.classList.toggle('is-editing', i === state.active));
  }

  function render() {
    renderControls();

    // Áp dụng CSS thật
    container.style.width = `${state.width}px`;
    state.items.forEach((it, i) => {
      itemEls[i].style.flex = `${it.grow} ${it.shrink} ${it.basis}px`;
    });

    const cs = getComputedStyle(container);
    const inner = container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const result = compute(inner);
    const measured = itemEls.map(el => el.getBoundingClientRect().width);

    itemEls.forEach((el, i) => { el.querySelector('.w-out').textContent = `${round(measured[i])}px`; });

    calcBody.innerHTML = state.items.map((it, i) => {
      const delta = result.sizes[i] - it.basis;
      const match = Math.abs(measured[i] - result.sizes[i]) < 1;
      return `<tr class="border-b border-slate-800/60 ${i === state.active ? 'bg-amber-400/5' : ''}">
        <td class="py-1 pr-2 font-sans font-bold text-slate-200">${NAMES[i]}</td>
        <td class="py-1 pr-2 text-sky-300">${it.basis}</td>
        <td class="py-1 pr-2 text-emerald-300">${it.grow}</td>
        <td class="py-1 pr-2 text-rose-300">${it.shrink}</td>
        <td class="py-1 pr-2 ${delta > 0 ? 'text-emerald-300' : delta < 0 ? 'text-rose-300' : 'text-slate-500'}">${signed(delta)}</td>
        <td class="py-1 pr-2 text-slate-200">${round(result.sizes[i])}px</td>
        <td class="py-1 ${match ? 'text-emerald-400' : 'text-amber-400'}">${round(measured[i])}px</td>
      </tr>`;
    }).join('');

    const sumBasis = state.items.reduce((s, it) => s + it.basis, 0);
    const base = `Khoảng trống = ${round(inner)} (vùng nội dung) − ${GAP * 2} (gap) − ${sumBasis} (Σbasis) = <b class="${result.free >= 0 ? 'text-emerald-300' : 'text-rose-300'}">${signed(result.free)}px</b>. `;
    if (result.mode === 'grow') {
      freeBadge.textContent = `dư ${signed(result.free)}px`;
      freeBadge.className = 'font-mono text-[0.75rem] font-semibold text-emerald-400';
      formula.innerHTML = base + (result.sumGrow > 0
        ? `Dư nên chia theo <code class="font-mono text-emerald-300">flex-grow</code>: mỗi item nhận ${round(result.free)} × grow / ${result.sumGrow}.`
        : `Σgrow = 0 nên phần dư bỏ trống, item giữ nguyên basis.`);
    } else {
      freeBadge.textContent = `thiếu ${signed(result.free)}px`;
      freeBadge.className = 'font-mono text-[0.75rem] font-semibold text-rose-400';
      formula.innerHTML = base + (result.sumWeight > 0
        ? `Thiếu nên co theo <code class="font-mono text-rose-300">flex-shrink × basis</code>: mỗi item co ${round(-result.free)} × (shrink × basis) / ${result.sumWeight}. Basis lớn thì co nhiều hơn.`
        : `Mọi item có shrink = 0 (hoặc basis = 0) nên không co được: item tràn khỏi container.`);
    }

    codeOutput.textContent = state.items
      .map((it, i) => `.item-${NAMES[i].toLowerCase()} { flex: ${it.grow} ${it.shrink} ${it.basis}px; }  /* grow shrink basis */`)
      .join('\n');
  }

  tabs.forEach(t => t.addEventListener('click', () => {
    state.active = +t.dataset.item;
    render();
  }));

  // Click trực tiếp vào item để chọn chỉnh
  itemEls.forEach((el, i) => el.addEventListener('click', () => {
    state.active = i;
    render();
  }));

  rangeWidth.addEventListener('input', () => { state.width = +rangeWidth.value; render(); });
  rangeGrow.addEventListener('input', () => { state.items[state.active].grow = +rangeGrow.value; render(); });
  rangeShrink.addEventListener('input', () => { state.items[state.active].shrink = +rangeShrink.value; render(); });
  rangeBasis.addEventListener('input', () => { state.items[state.active].basis = +rangeBasis.value; render(); });

  presetButtons.forEach(b => b.addEventListener('click', () => {
    state.items = PRESETS[b.dataset.preset].map(it => ({ ...it }));
    render();
  }));

  btnReset.addEventListener('click', () => {
    state.width = 480;
    state.active = 0;
    state.items = defaultItems();
    rangeWidth.value = 480;
    render();
  });

  btnCopy.addEventListener('click', () => copyText(codeOutput.textContent, btnCopy));

  // Tính lại khi CSS Tailwind (CDN) áp dụng xong làm đổi padding/viền container
  new ResizeObserver(() => render()).observe(container);

  render();
});

function copyText(text, btn) {
  const done = () => {
    btn.textContent = 'Copied';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => {});
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  if (document.execCommand('copy')) done();
  ta.remove();
}
