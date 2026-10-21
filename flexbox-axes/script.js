document.addEventListener('DOMContentLoaded', () => {
  const dirButtons = document.querySelectorAll('.btn-dir');
  const jcButtons = document.querySelectorAll('.btn-jc');
  const aiButtons = document.querySelectorAll('.btn-ai');
  const stage = document.getElementById('stage');
  const flexBox = document.getElementById('flexBox');
  const axisLayer = document.getElementById('axisLayer');
  const jcPhysical = document.getElementById('jcPhysical');
  const aiPhysical = document.getElementById('aiPhysical');
  const dirTitle = document.getElementById('dirTitle');
  const dirDesc = document.getElementById('dirDesc');
  const codeOutput = document.getElementById('codeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const DEFAULTS = { dir: 'row', jc: 'flex-start', ai: 'flex-start' };
  const state = { ...DEFAULTS };

  // Hướng vật lý của 2 trục theo từng flex-direction
  const AXES = {
    row:              { main: 'h', mainRev: false, mainStart: 'trái',  mainEnd: 'phải', crossStart: 'trên', crossEnd: 'dưới' },
    'row-reverse':    { main: 'h', mainRev: true,  mainStart: 'phải',  mainEnd: 'trái', crossStart: 'trên', crossEnd: 'dưới' },
    column:           { main: 'v', mainRev: false, mainStart: 'trên',  mainEnd: 'dưới', crossStart: 'trái', crossEnd: 'phải' },
    'column-reverse': { main: 'v', mainRev: true,  mainStart: 'dưới',  mainEnd: 'trên', crossStart: 'trái', crossEnd: 'phải' }
  };

  const code = (s) => `<code class="font-mono text-sky-400">${s}</code>`;
  const DESC = {
    row: ['Trục chính nằm ngang', `Item xếp từ trái sang phải. Trục phụ vuông góc, chạy từ trên xuống.`],
    'row-reverse': ['Trục chính nằm ngang, đảo chiều', `Item xếp từ phải sang trái: item 1 nằm ở mép phải. ${code('flex-start')} giờ là mép phải.`],
    column: ['Trục chính nằm dọc', `Item xếp từ trên xuống. Trục phụ chuyển sang nằm ngang, nên ${code('align-items')} giờ căn theo chiều ngang.`],
    'column-reverse': ['Trục chính nằm dọc, đảo chiều', `Item xếp từ dưới lên: item 1 nằm ở đáy. ${code('flex-start')} giờ là mép dưới.`]
  };

  const COLORS = { main: '#38bdf8', cross: '#fbbf24' };
  const GAP = 16; // khoảng cách mũi tên tới mép container

  // Vẽ một mũi tên trục bằng SVG, kèm nhãn tên trục và start/end
  function arrow(kind, orient, reversed, box) {
    const color = COLORS[kind];
    const name = kind === 'main' ? 'main axis (trục chính)' : 'cross axis (trục phụ)';
    if (orient === 'h') {
      const y = box.top - GAP;
      const [x1, x2] = reversed ? [box.right, box.left] : [box.left, box.right];
      const ty = y - 7;
      const mid = (box.left + box.right) / 2;
      return `
        <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="2" marker-end="url(#head-${kind})"/>
        <text x="${x1}" y="${ty}" fill="${color}" text-anchor="${reversed ? 'end' : 'start'}">start</text>
        <text x="${mid}" y="${ty}" fill="${color}" text-anchor="middle">${name}</text>
        <text x="${x2}" y="${ty}" fill="${color}" text-anchor="${reversed ? 'start' : 'end'}" dx="${reversed ? 10 : -10}">end</text>`;
    }
    const x = box.left - GAP;
    const [y1, y2] = reversed ? [box.bottom, box.top] : [box.top, box.bottom];
    const tx = x - 7;
    const mid = (box.top + box.bottom) / 2;
    // Chữ xoay -90 độ: text-anchor "start" hướng lên trên
    return `
      <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${color}" stroke-width="2" marker-end="url(#head-${kind})"/>
      <text transform="translate(${tx} ${y1}) rotate(-90)" fill="${color}" text-anchor="${reversed ? 'start' : 'end'}">start</text>
      <text transform="translate(${tx} ${mid}) rotate(-90)" fill="${color}" text-anchor="middle">${name}</text>
      <text transform="translate(${tx} ${y2}) rotate(-90)" fill="${color}" text-anchor="${reversed ? 'end' : 'start'}" dx="${reversed ? -10 : 10}">end</text>`;
  }

  function drawAxes() {
    const s = stage.getBoundingClientRect();
    const f = flexBox.getBoundingClientRect();
    if (!s.width || !f.width) return;
    const box = { left: f.left - s.left, top: f.top - s.top, right: f.right - s.left, bottom: f.bottom - s.top };
    const ax = AXES[state.dir];
    const crossOrient = ax.main === 'h' ? 'v' : 'h';

    axisLayer.setAttribute('width', s.width);
    axisLayer.setAttribute('height', s.height);
    axisLayer.setAttribute('viewBox', `0 0 ${s.width} ${s.height}`);
    axisLayer.innerHTML = `
      <defs>
        <marker id="head-main" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${COLORS.main}"/></marker>
        <marker id="head-cross" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${COLORS.cross}"/></marker>
      </defs>
      ${arrow('main', ax.main, ax.mainRev, box)}
      ${arrow('cross', crossOrient, false, box)}`;
  }

  function render() {
    const ax = AXES[state.dir];
    dirButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.dir === state.dir)));
    jcButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.jc === state.jc)));
    aiButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.ai === state.ai)));

    // Áp dụng CSS thật
    flexBox.style.flexDirection = state.dir;
    flexBox.style.justifyContent = state.jc;
    flexBox.style.alignItems = state.ai;

    const mainAxis = ax.main === 'h' ? 'chiều ngang' : 'chiều dọc';
    const crossAxis = ax.main === 'h' ? 'chiều dọc' : 'chiều ngang';
    jcPhysical.innerHTML = `Căn theo <b class="text-sky-300">${mainAxis}</b>: start = mép ${ax.mainStart}, end = mép ${ax.mainEnd}`;
    aiPhysical.innerHTML = `Căn theo <b class="text-amber-300">${crossAxis}</b>: start = mép ${ax.crossStart}, end = mép ${ax.crossEnd}`;

    dirTitle.textContent = DESC[state.dir][0];
    dirDesc.innerHTML = DESC[state.dir][1];

    codeOutput.textContent =
`.container {
  display: flex;
  flex-direction: ${state.dir};
  justify-content: ${state.jc};   /* trục chính */
  align-items: ${state.ai};       /* trục phụ */
}`;

    drawAxes();
  }

  function bindGroup(buttons, key, attr) {
    buttons.forEach(b => b.addEventListener('click', () => {
      state[key] = b.dataset[attr];
      render();
    }));
  }
  bindGroup(dirButtons, 'dir', 'dir');
  bindGroup(jcButtons, 'jc', 'jc');
  bindGroup(aiButtons, 'ai', 'ai');

  btnReset.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    render();
  });

  btnCopy.addEventListener('click', () => copyText(codeOutput.textContent, btnCopy));

  // Vẽ lại khi kích thước đổi (Tailwind CDN sinh CSS bất đồng bộ, font tải sau)
  new ResizeObserver(drawAxes).observe(stage);

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
