document.addEventListener('DOMContentLoaded', () => {
  const optButtons = document.querySelectorAll('.opt');
  const acCard = document.getElementById('acCard');
  const acStatus = document.getElementById('acStatus');
  const rangeWidth = document.getElementById('rangeWidth');
  const rangeCount = document.getElementById('rangeCount');
  const widthBadge = document.getElementById('widthBadge');
  const countBadge = document.getElementById('countBadge');
  const container = document.getElementById('container');
  const lineLayer = document.getElementById('lineLayer');
  const mLines = document.getElementById('mLines');
  const mWidth = document.getElementById('mWidth');
  const explain = document.getElementById('explain');
  const codeOutput = document.getElementById('codeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const DEFAULTS = { wrap: 'wrap', ac: 'normal', width: 100, count: 8 };
  const state = { ...DEFAULTS };
  const BASE_WIDTH = 90;

  const code = (s) => `<code class="font-mono text-sky-400">${s}</code>`;
  const WRAP_TEXT = {
    nowrap: `Mọi item nằm trên 1 dòng. Thiếu chỗ thì item bị co lại (${code('flex-shrink: 1')}) hoặc tràn ra ngoài.`,
    wrap: 'Thiếu chỗ thì item xuống dòng mới, các dòng xếp từ trên xuống.',
    'wrap-reverse': 'Vẫn xuống dòng nhưng các dòng xếp ngược từ dưới lên.'
  };
  const AC_TEXT = {
    normal: 'Các dòng giãn chia đều chiều cao container (như stretch).',
    'flex-start': 'Các dòng dồn về đầu trục phụ.',
    center: 'Các dòng dồn vào giữa trục phụ.',
    'flex-end': 'Các dòng dồn về cuối trục phụ.',
    'space-between': 'Dòng đầu và cuối sát mép, khoảng trống chia đều giữa các dòng.',
    'space-around': 'Mỗi dòng có lề bằng nhau phía trên và dưới.'
  };

  function buildItems() {
    container.querySelectorAll('.item').forEach(el => el.remove());
    for (let i = 1; i <= state.count; i++) {
      const el = document.createElement('div');
      el.className = 'item';
      const hue = (200 + i * 23) % 360;
      el.style.background = `hsl(${hue} 70% 45% / 0.28)`;
      el.style.borderColor = `hsl(${hue} 80% 65%)`;
      el.textContent = i;
      container.appendChild(el);
    }
  }

  // Gom item theo vị trí dọc để tìm các dòng flex, rồi vẽ dải đánh dấu
  function measure() {
    const items = [...container.querySelectorAll('.item')];
    const c = container.getBoundingClientRect();
    const borderTop = parseFloat(getComputedStyle(container).borderTopWidth) || 0;
    const lines = [];
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      const line = lines.find(l => Math.abs(l.top - r.top) < 2);
      if (line) {
        line.bottom = Math.max(line.bottom, r.bottom);
      } else {
        lines.push({ top: r.top, bottom: r.bottom });
      }
    });
    lines.sort((a, b) => a.top - b.top);

    lineLayer.innerHTML = lines.map((l, i) => {
      // Số thứ tự dòng theo trục phụ: wrap-reverse đếm từ dưới lên
      const idx = state.wrap === 'wrap-reverse' ? lines.length - i : i + 1;
      return `<div class="line-band" style="top:${l.top - c.top - borderTop}px;height:${l.bottom - l.top}px"><span>dòng ${idx}</span></div>`;
    }).join('');

    mLines.textContent = String(lines.length);
    const w = items.length ? Math.round(items[0].getBoundingClientRect().width * 10) / 10 : 0;
    mWidth.textContent = w < BASE_WIDTH - 0.5 ? `${BASE_WIDTH}px khai báo → ${w}px (bị co)` : `${w}px`;
    mWidth.className = `font-mono font-semibold ${w < BASE_WIDTH - 0.5 ? 'text-rose-400' : 'text-slate-200'}`;
  }

  function render() {
    optButtons.forEach(b => b.setAttribute('aria-pressed', String(String(state[b.dataset.key]) === b.dataset.val)));
    widthBadge.textContent = `${state.width}%`;
    countBadge.textContent = String(state.count);

    if (container.querySelectorAll('.item').length !== state.count) buildItems();

    // Áp dụng CSS thật
    container.style.display = 'flex';
    container.style.flexWrap = state.wrap;
    container.style.alignContent = state.ac;
    container.style.width = `${state.width}%`;

    // align-content chỉ áp dụng cho container nhiều dòng (flex-wrap khác nowrap)
    const active = state.wrap !== 'nowrap';
    acCard.dataset.inactive = String(!active);
    acStatus.textContent = active ? 'đang có tác dụng' : 'bị bỏ qua (nowrap)';
    acStatus.className = `normal-case tracking-normal font-semibold ${active ? 'text-emerald-400' : 'text-rose-400'}`;

    explain.innerHTML = active
      ? `${WRAP_TEXT[state.wrap]} <b class="text-slate-200">${state.ac}:</b> ${AC_TEXT[state.ac]}`
      : `${WRAP_TEXT.nowrap} ${code('align-content')} chỉ phân bổ các dòng của container nhiều dòng nên không có tác dụng.`;

    codeOutput.textContent =
`.container {
  display: flex;
  flex-wrap: ${state.wrap};
  align-content: ${state.ac};
  gap: 6px;
  width: ${state.width}%;
}
.item { width: ${BASE_WIDTH}px; }`;

    measure();
  }

  optButtons.forEach(b => b.addEventListener('click', () => {
    state[b.dataset.key] = b.dataset.val;
    render();
  }));

  rangeWidth.addEventListener('input', () => { state.width = +rangeWidth.value; render(); });
  rangeCount.addEventListener('input', () => { state.count = +rangeCount.value; render(); });

  btnReset.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    rangeWidth.value = DEFAULTS.width;
    rangeCount.value = DEFAULTS.count;
    render();
  });

  btnCopy.addEventListener('click', () => copyText(codeOutput.textContent, btnCopy));

  // Đo lại khi kích thước container đổi (Tailwind CDN sinh CSS bất đồng bộ, font tải sau)
  new ResizeObserver(measure).observe(container);

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
