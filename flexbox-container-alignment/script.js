document.addEventListener('DOMContentLoaded', () => {
  const optButtons = document.querySelectorAll('.opt');
  const presetButtons = document.querySelectorAll('.preset');
  const flexControls = document.getElementById('flexControls');
  const container = document.getElementById('container');
  const items = [...container.querySelectorAll('.item')];
  const spaceOutput = document.getElementById('spaceOutput');
  const explain = document.getElementById('explain');
  const codeOutput = document.getElementById('codeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const DEFAULTS = { display: 'flex', direction: 'row', justify: 'flex-start', align: 'stretch' };
  const PRESETS = {
    navbar: { display: 'flex', direction: 'row', justify: 'space-between', align: 'center' },
    center: { display: 'flex', direction: 'row', justify: 'center', align: 'center' }
  };
  const state = { ...DEFAULTS };

  const JUSTIFY_TEXT = {
    'flex-start': 'Dồn item về đầu trục chính, khoảng trống dư nằm ở cuối.',
    center: 'Dồn item vào giữa, khoảng trống chia đều hai đầu.',
    'flex-end': 'Dồn item về cuối trục chính, khoảng trống nằm ở đầu.',
    'space-between': 'Item đầu và cuối sát mép, khoảng trống chia đều giữa các item.',
    'space-around': 'Mỗi item có lề bằng nhau hai bên, nên khoảng ở mép bằng một nửa khoảng giữa.',
    'space-evenly': 'Mọi khoảng trống, kể cả hai mép, bằng nhau.'
  };
  const ALIGN_TEXT = {
    stretch: 'Item giãn kín chiều trục phụ (vì không đặt kích thước cố định).',
    'flex-start': 'Item giữ kích thước nội dung, nằm ở đầu trục phụ.',
    center: 'Item giữ kích thước nội dung, nằm giữa trục phụ.',
    'flex-end': 'Item giữ kích thước nội dung, nằm ở cuối trục phụ.',
    baseline: 'Căn theo đường chân chữ dòng đầu tiên: chữ của 4 item thẳng hàng dù cỡ chữ khác nhau.'
  };

  const code = (s) => `<code class="font-mono text-sky-400">${s}</code>`;

  // Đo khoảng trống dọc trục chính, theo thứ tự main-start -> main-end
  function measureSpace() {
    if (state.display !== 'flex') {
      spaceOutput.textContent = '-';
      return;
    }
    const horizontal = state.direction.startsWith('row');
    const reverse = state.direction.endsWith('reverse');
    const cs = getComputedStyle(container);
    const r = container.getBoundingClientRect();
    const px = (v) => parseFloat(v) || 0;
    const contentStart = horizontal
      ? r.left + px(cs.borderLeftWidth) + px(cs.paddingLeft)
      : r.top + px(cs.borderTopWidth) + px(cs.paddingTop);
    const contentEnd = horizontal
      ? r.right - px(cs.borderRightWidth) - px(cs.paddingRight)
      : r.bottom - px(cs.borderBottomWidth) - px(cs.paddingBottom);

    const spans = items
      .map(el => el.getBoundingClientRect())
      .map(b => horizontal ? [b.left, b.right] : [b.top, b.bottom])
      .sort((a, b) => a[0] - b[0]);

    const gaps = [];
    for (let i = 1; i < spans.length; i++) gaps.push(spans[i][0] - spans[i - 1][1]);
    let lead = spans[0][0] - contentStart;
    let trail = contentEnd - spans[spans.length - 1][1];
    if (reverse) {
      [lead, trail] = [trail, lead];
      gaps.reverse();
    }
    const f = (n) => Math.round(n);
    spaceOutput.textContent = `start ${f(lead)} | ${gaps.map(f).join(' · ')} | end ${f(trail)}  (px)`;
  }

  function render() {
    const isFlex = state.display === 'flex';

    optButtons.forEach(b => b.setAttribute('aria-pressed', String(state[b.dataset.key] === b.dataset.val)));
    flexControls.dataset.disabled = String(!isFlex);

    // Áp dụng CSS thật
    container.style.display = state.display;
    container.style.flexDirection = isFlex ? state.direction : '';
    container.style.justifyContent = isFlex ? state.justify : '';
    container.style.alignItems = isFlex ? state.align : '';

    if (!isFlex) {
      explain.innerHTML = `Với ${code('display: block')}, các thuộc tính flex bị bỏ qua: item xếp dọc theo luồng thường và chiếm hết chiều ngang.`;
      codeOutput.textContent = '.container {\n  display: block;\n}';
    } else {
      let alignNote = ALIGN_TEXT[state.align];
      if (state.align === 'baseline' && state.direction.startsWith('column')) {
        alignNote = `Với ${code('column')}, trục phụ nằm ngang nên ${code('baseline')} hoạt động như ${code('flex-start')}.`;
      }
      explain.innerHTML = `<b class="text-slate-200">${state.justify}:</b> ${JUSTIFY_TEXT[state.justify]} <b class="text-slate-200">${state.align}:</b> ${alignNote}`;
      codeOutput.textContent =
`.container {
  display: flex;
  flex-direction: ${state.direction};
  justify-content: ${state.justify};
  align-items: ${state.align};
}`;
    }

    measureSpace();
  }

  optButtons.forEach(b => b.addEventListener('click', () => {
    state[b.dataset.key] = b.dataset.val;
    render();
  }));

  presetButtons.forEach(b => b.addEventListener('click', () => {
    Object.assign(state, PRESETS[b.dataset.preset]);
    render();
  }));

  btnReset.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    render();
  });

  btnCopy.addEventListener('click', () => copyText(codeOutput.textContent, btnCopy));

  // Đo lại khi kích thước đổi (Tailwind CDN sinh CSS bất đồng bộ, font tải sau)
  const ro = new ResizeObserver(measureSpace);
  ro.observe(container);
  items.forEach(el => ro.observe(el));

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
