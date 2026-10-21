document.addEventListener('DOMContentLoaded', () => {
  const orderList = document.getElementById('orderList');
  const container = document.getElementById('container');
  const domRow = document.getElementById('domRow');
  const visualRow = document.getElementById('visualRow');
  const focusInfo = document.getElementById('focusInfo');
  const presetButtons = document.querySelectorAll('.preset');
  const codeOutput = document.getElementById('codeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const ITEMS = [
    { name: 'A', hue: 199 },
    { name: 'B', hue: 262 },
    { name: 'C', hue: 152 },
    { name: 'D', hue: 350 },
    { name: 'E', hue: 38 }
  ];
  const MIN = -3;
  const MAX = 5;
  const PRESETS = {
    first: [0, 0, -1, 0, 0],
    last: [1, 0, 0, 0, 0],
    reverse: [4, 3, 2, 1, 0]
  };
  let orders = [0, 0, 0, 0, 0];

  const fill = (h) => `hsl(${h} 70% 45% / 0.25)`;
  const stroke = (h) => `hsl(${h} 80% 65%)`;

  // Tạo item thật trong container (button để Tab focus được) và hàng điều khiển
  const itemEls = ITEMS.map((it, i) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'item';
    el.style.background = fill(it.hue);
    el.style.borderColor = stroke(it.hue);
    el.innerHTML = `<span class="name">${it.name}</span><span class="meta"></span>`;
    el.addEventListener('focus', () => showFocus(i));
    el.addEventListener('blur', () => { focusInfo.textContent = '-'; });
    container.appendChild(el);
    return el;
  });

  const valueEls = ITEMS.map((it, i) => {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-2';
    li.innerHTML = `
      <span class="chip" style="background:${fill(it.hue)};border-color:${stroke(it.hue)}">${it.name}</span>
      <code class="flex-1 font-mono text-[0.78rem] text-slate-400">.item-${it.name.toLowerCase()}</code>
      <button type="button" class="step" data-i="${i}" data-d="-1" aria-label="Giảm order của ${it.name}">−</button>
      <span class="w-7 text-center font-mono text-[0.85rem] font-bold text-sky-300" data-value></span>
      <button type="button" class="step" data-i="${i}" data-d="1" aria-label="Tăng order của ${it.name}">+</button>`;
    orderList.appendChild(li);
    return li;
  });

  orderList.addEventListener('click', (e) => {
    const btn = e.target.closest('.step');
    if (!btn) return;
    const i = +btn.dataset.i;
    orders[i] = Math.min(MAX, Math.max(MIN, orders[i] + +btn.dataset.d));
    render(true);
  });

  // Thứ tự hiển thị đo từ vị trí layout thật (offsetLeft không bị ảnh hưởng bởi transform của animation)
  function visualOrder() {
    return itemEls
      .map((el, i) => ({ i, x: el.offsetLeft }))
      .sort((a, b) => a.x - b.x)
      .map(o => o.i);
  }

  function showFocus(i) {
    const vis = visualOrder().indexOf(i) + 1;
    focusInfo.innerHTML = `<b class="text-amber-300">${ITEMS[i].name}</b> · vị trí HTML ${i + 1}, vị trí hiển thị ${vis}`;
  }

  const chip = (i) => `<span class="chip" style="background:${fill(ITEMS[i].hue)};border-color:${stroke(ITEMS[i].hue)}">${ITEMS[i].name}</span>`;

  function render(animate) {
    // FLIP: ghi vị trí cũ trước khi đổi order để tạo chuyển động
    const before = itemEls.map(el => el.offsetLeft);

    // Áp dụng CSS thật
    itemEls.forEach((el, i) => {
      el.style.order = orders[i];
      el.querySelector('.meta').textContent = `order: ${orders[i]}`;
    });

    if (animate && typeof itemEls[0].animate === 'function') {
      itemEls.forEach((el, i) => {
        const dx = before[i] - el.offsetLeft;
        if (Math.abs(dx) > 0.5) {
          el.animate([{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }], { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' });
        }
      });
    }

    valueEls.forEach((li, i) => {
      li.querySelector('[data-value]').textContent = orders[i];
      li.querySelector('[data-d="-1"]').disabled = orders[i] <= MIN;
      li.querySelector('[data-d="1"]').disabled = orders[i] >= MAX;
    });

    domRow.innerHTML = ITEMS.map((_, i) => chip(i)).join('');
    visualRow.innerHTML = visualOrder().map(chip).join('');

    const active = document.activeElement;
    const fi = itemEls.indexOf(active);
    if (fi >= 0) showFocus(fi);

    const rules = orders
      .map((o, i) => (o !== 0 ? `.item-${ITEMS[i].name.toLowerCase()} { order: ${o}; }` : null))
      .filter(Boolean);
    codeOutput.textContent = rules.length ? rules.join('\n') : '/* Mọi item đang order: 0 (mặc định) -> xếp theo thứ tự HTML */';
  }

  presetButtons.forEach(b => b.addEventListener('click', () => {
    orders = [...PRESETS[b.dataset.preset]];
    render(true);
  }));

  btnReset.addEventListener('click', () => {
    orders = [0, 0, 0, 0, 0];
    render(true);
  });

  btnCopy.addEventListener('click', () => copyText(codeOutput.textContent, btnCopy));

  render(false);
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
