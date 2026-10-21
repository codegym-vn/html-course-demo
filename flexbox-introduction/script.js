document.addEventListener('DOMContentLoaded', () => {
  const modeButtons = document.querySelectorAll('.btn-mode');
  const container = document.getElementById('container');
  const containerLabel = document.getElementById('containerLabel');
  const items = container.querySelectorAll('.item');
  const checkCenter = document.getElementById('checkCenter');
  const alignField = document.getElementById('alignField');
  const alignHint = document.getElementById('alignHint');
  const modeTitle = document.getElementById('modeTitle');
  const modeDesc = document.getElementById('modeDesc');
  const mDirection = document.getElementById('mDirection');
  const mGap = document.getElementById('mGap');
  const mHeights = document.getElementById('mHeights');
  const codeOutput = document.getElementById('codeOutput');
  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const state = { mode: 'block', center: false };

  const code = (s) => `<code class="font-mono text-sky-400">${s}</code>`;
  const info = {
    block: {
      title: 'Xếp chồng theo chiều dọc',
      desc: `Mỗi ${code('div')} là khối ${code('block')}: chiếm hết chiều ngang, phần tử sau xuống dòng mới.`
    },
    'inline-block': {
      title: 'Xếp ngang nhưng khó kiểm soát',
      desc: `Item nằm trên cùng dòng chữ: khoảng trắng trong HTML tạo khe hở, item căn theo đường chân chữ (baseline) nên chiều cao không đều.`
    },
    flex: {
      title: 'Flexbox: xếp theo một trục',
      desc: `Chỉ cần ${code('display: flex')} trên thẻ cha. Con trực tiếp thành flex item, xếp theo trục ngang, không còn khe hở do khoảng trắng, mặc định giãn cao bằng nhau (${code('align-items: stretch')}).`
    }
  };

  // Đo thực tế bằng getBoundingClientRect để học viên thấy số liệu thật của trình duyệt
  function measure() {
    const [a, b, c] = [...items].map(el => el.getBoundingClientRect());
    const horizontal = b.top < a.bottom - 1;
    mDirection.textContent = horizontal ? 'Ngang (cùng hàng)' : 'Dọc (mỗi item một dòng)';
    const gap = horizontal ? b.left - a.right : b.top - a.bottom;
    mGap.textContent = `${Math.round(gap * 10) / 10}px`;
    const hs = [a, b, c].map(r => Math.round(r.height));
    mHeights.textContent = `${hs.join(' / ')}px`;
    mHeights.className = `font-mono font-semibold ${hs[0] === hs[1] && hs[1] === hs[2] ? 'text-emerald-400' : 'text-amber-400'}`;
  }

  function render() {
    const isFlex = state.mode === 'flex';

    modeButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.mode === state.mode)));

    // Áp dụng CSS thật
    container.dataset.mode = state.mode;
    container.style.display = isFlex ? 'flex' : 'block';
    container.style.alignItems = isFlex && state.center ? 'center' : '';
    items.forEach(el => { el.style.display = state.mode === 'inline-block' ? 'inline-block' : ''; });

    containerLabel.textContent = isFlex ? '.container  (flex container)' : '.container  (block)';

    alignField.dataset.disabled = String(!isFlex);
    checkCenter.disabled = !isFlex;
    alignHint.textContent = isFlex
      ? (state.center ? 'Item co về chiều cao nội dung và nằm giữa theo chiều dọc.' : 'Mặc định stretch: item giãn bằng chiều cao thẻ cha.')
      : 'Chỉ có tác dụng với flex container.';

    modeTitle.textContent = info[state.mode].title;
    modeDesc.innerHTML = info[state.mode].desc;

    const lines = [];
    if (isFlex) {
      lines.push(state.center ? '.container { display: flex; align-items: center; }' : '.container { display: flex; }');
    } else {
      lines.push('.container { display: block; }');
      lines.push(`.item      { display: ${state.mode}; }`);
    }
    codeOutput.textContent = lines.join('\n');

    measure();
  }

  modeButtons.forEach(btn => btn.addEventListener('click', () => {
    state.mode = btn.dataset.mode;
    render();
  }));

  checkCenter.addEventListener('change', () => {
    state.center = checkCenter.checked;
    render();
  });

  btnReset.addEventListener('click', () => {
    state.mode = 'block';
    state.center = false;
    checkCenter.checked = false;
    render();
  });

  btnCopy.addEventListener('click', () => copyText(codeOutput.textContent, btnCopy));

  // Tailwind CDN sinh CSS bất đồng bộ và font web tải sau -> đo lại mỗi khi kích thước item đổi
  const ro = new ResizeObserver(measure);
  items.forEach(el => ro.observe(el));
  ro.observe(container);

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
