document.addEventListener('DOMContentLoaded', () => {
  const code = (s) => `<code class="font-mono text-sky-400">${s}</code>`;

  /* ================= Tabs ================= */
  const tabs = document.querySelectorAll('.tab');
  const panels = { sticky: document.getElementById('panelSticky'), zindex: document.getElementById('panelZ') };

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    Object.entries(panels).forEach(([key, panel]) => {
      const show = key === tab.dataset.tab;
      panel.classList.toggle('hidden', !show);
      panel.classList.toggle('grid', show);
    });
    if (tab.dataset.tab === 'sticky') { updateThreshold(); detectStuck(); } else { measureZ(); }
  }));

  /* ================= Tab 1: Sticky ================= */
  const stickyOpts = document.querySelectorAll('#panelSticky .opt');
  const rangeTop = document.getElementById('rangeTop');
  const topBadge = document.getElementById('topBadge');
  const checkOverflow = document.getElementById('checkOverflow');
  const overflowHint = document.getElementById('overflowHint');
  const stickyTitle = document.getElementById('stickyTitle');
  const stickyDesc = document.getElementById('stickyDesc');
  const stuckOutput = document.getElementById('stuckOutput');
  const scrollArea = document.getElementById('scrollArea');
  const sections = [...scrollArea.querySelectorAll('.sticky-section')];
  const headers = [...scrollArea.querySelectorAll('.sticky-header')];
  const thresholdLine = document.getElementById('thresholdLine');
  const thresholdLabel = document.getElementById('thresholdLabel');
  const stickyCode = document.getElementById('stickyCode');

  const sticky = { pos: 'sticky', top: 0, overflow: false };

  function updateThreshold() {
    // Vạch ngưỡng: mép trên vùng cuộn (sau viền) + top
    const border = parseFloat(getComputedStyle(scrollArea).borderTopWidth) || 0;
    thresholdLine.style.top = `${border + sticky.top}px`;
    thresholdLine.style.display = sticky.pos === 'sticky' ? '' : 'none';
    thresholdLabel.textContent = `top: ${sticky.top}px`;
  }

  // Một tiêu đề "đang dính" khi nó nằm đúng tại ngưỡng trong khi thẻ cha đã cuộn lên quá ngưỡng
  function detectStuck() {
    const a = scrollArea.getBoundingClientRect();
    const border = parseFloat(getComputedStyle(scrollArea).borderTopWidth) || 0;
    const line = a.top + border + sticky.top;
    const stuck = headers.filter((h, i) => {
      const hr = h.getBoundingClientRect();
      const sr = sections[i].getBoundingClientRect();
      return Math.abs(hr.top - line) < 1.5 && sr.top < hr.top - 1;
    });
    if (stuck.length) {
      stuckOutput.textContent = stuck.map(h => h.dataset.name).join(', ');
      stuckOutput.className = 'font-semibold text-emerald-400';
    } else {
      stuckOutput.textContent = 'Không có';
      stuckOutput.className = 'font-semibold text-slate-400';
    }
  }

  function renderSticky() {
    stickyOpts.forEach(b => b.setAttribute('aria-pressed', String(sticky[b.dataset.key] === b.dataset.val)));
    topBadge.textContent = `${sticky.top}px`;

    // Áp dụng CSS thật
    headers.forEach(h => {
      h.style.position = sticky.pos;
      h.style.top = `${sticky.top}px`;
    });
    sections.forEach(s => { s.style.overflow = sticky.overflow ? 'hidden' : ''; });

    if (sticky.pos === 'relative') {
      stickyTitle.textContent = 'relative: cuộn theo nội dung';
      stickyDesc.innerHTML = `Tiêu đề trôi đi cùng mục, không dính. Với ${code('relative')}, ${code('top')} chỉ dịch phần tử khỏi vị trí gốc.`;
    } else if (sticky.overflow) {
      stickyTitle.textContent = 'Sticky bị vô hiệu';
      stickyDesc.innerHTML = `Mục cha có ${code('overflow: hidden')} nên trở thành khung cuộn gần nhất của tiêu đề. Mục cha không cuộn, nên tiêu đề không bao giờ chạm ngưỡng.`;
    } else {
      stickyTitle.textContent = 'Lai giữa relative và fixed';
      stickyDesc.innerHTML = `Nằm trong luồng như ${code('relative')}. Khi cuộn chạm ngưỡng ${code('top')}, tiêu đề dính lại như ${code('fixed')}, nhưng chỉ trong phạm vi thẻ cha.`;
    }
    overflowHint.textContent = sticky.overflow
      ? 'Tổ tiên có overflow khác visible là nguyên nhân phổ biến nhất khiến sticky "không chạy".'
      : 'Lỗi thường gặp: bật để thấy sticky ngừng hoạt động.';

    const lines = [`.section-header {\n  position: ${sticky.pos};\n  top: ${sticky.top}px;\n}`];
    if (sticky.overflow) lines.push('.section { overflow: hidden; }  /* làm hỏng sticky */');
    stickyCode.textContent = lines.join('\n');

    updateThreshold();
    detectStuck();
  }

  stickyOpts.forEach(b => b.addEventListener('click', () => { sticky.pos = b.dataset.val; renderSticky(); }));
  rangeTop.addEventListener('input', () => { sticky.top = +rangeTop.value; renderSticky(); });
  checkOverflow.addEventListener('change', () => { sticky.overflow = checkOverflow.checked; renderSticky(); });
  scrollArea.addEventListener('scroll', detectStuck, { passive: true });

  /* ================= Tab 2: z-index ================= */
  const ranges = [1, 2, 3].map(i => document.getElementById(`z${i}`));
  const badges = [1, 2, 3].map(i => document.getElementById(`z${i}Badge`));
  const boxes = [1, 2, 3].map(i => document.getElementById(`box${i}`));
  const checkStatic = document.getElementById('checkStatic');
  const checkContext = document.getElementById('checkContext');
  const ctx = document.getElementById('ctx');
  const zExplain = document.getElementById('zExplain');
  const top12 = document.getElementById('top12');
  const top23 = document.getElementById('top23');
  const zCode = document.getElementById('zCode');

  // Hỏi trình duyệt phần tử nào nằm trên cùng tại tâm vùng chồng của 2 hộp
  function topAt(a, b) {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const left = Math.max(ra.left, rb.left);
    const right = Math.min(ra.right, rb.right);
    const top = Math.max(ra.top, rb.top);
    const bottom = Math.min(ra.bottom, rb.bottom);
    if (right <= left || bottom <= top) return null;
    const hit = document.elementFromPoint((left + right) / 2, (top + bottom) / 2);
    const box = hit && hit.closest('.z-box');
    return box ? box.querySelector('b').textContent : null;
  }

  function measureZ() {
    if (panels.zindex.classList.contains('hidden')) return;
    top12.textContent = `${topAt(boxes[0], boxes[1]) || '-'} ở trên`;
    top23.textContent = `${topAt(boxes[1], boxes[2]) || '-'} ở trên`;
  }

  function renderZ() {
    const z = ranges.map(r => +r.value);
    const isStatic = checkStatic.checked;
    const hasCtx = checkContext.checked;

    z.forEach((v, i) => { badges[i].textContent = v; });

    // Áp dụng CSS thật
    boxes.forEach((box, i) => { box.style.zIndex = z[i]; });
    boxes[1].style.position = isStatic ? 'static' : 'relative';
    ctx.style.position = hasCtx ? 'relative' : '';
    ctx.style.zIndex = hasCtx ? '1' : '';
    ctx.dataset.on = String(hasCtx);

    boxes.forEach((box, i) => {
      const ignored = i === 1 && isStatic;
      box.querySelector('.z-tag').textContent = ignored ? `z-index: ${z[i]} (bị bỏ qua)` : `z-index: ${z[i]}`;
    });

    const notes = [
      `<b class="text-slate-200">Quy tắc:</b> ${code('z-index')} lớn hơn nằm trên. Bằng nhau thì phần tử đứng sau trong HTML nằm trên.`
    ];
    if (isStatic) notes.push(`<b class="text-rose-300">Hộp 2 static:</b> ${code('z-index')} chỉ áp dụng cho phần tử có ${code('position')} khác ${code('static')} (hoặc flex/grid item). Hộp 2 bị vẽ dưới mọi hộp đã định vị.`);
    if (hasCtx) notes.push(`<b class="text-amber-300">Stacking context:</b> thẻ cha ${code('z-index: 1')} gói Hộp 1 thành một lớp. ${code('z-index')} của Hộp 1 chỉ so trong lớp đó, nên dù bằng 10 vẫn nằm dưới Hộp 2 khi Hộp 2 có z-index ≥ 1.`);
    zExplain.innerHTML = notes.join('<br>');

    const lines = [];
    if (hasCtx) lines.push('.parent { position: relative; z-index: 1; }');
    lines.push(`.box-1  { position: relative; z-index: ${z[0]}; }`);
    lines.push(`.box-2  { position: ${isStatic ? 'static' : 'relative'}; z-index: ${z[1]}; }`);
    lines.push(`.box-3  { position: relative; z-index: ${z[2]}; }`);
    zCode.textContent = lines.join('\n');

    measureZ();
  }

  ranges.forEach(r => r.addEventListener('input', renderZ));
  checkStatic.addEventListener('change', renderZ);
  checkContext.addEventListener('change', renderZ);

  /* ================= Copy ================= */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyText(document.getElementById(btn.dataset.copy).textContent, btn));
  });

  // Tailwind CDN sinh CSS bất đồng bộ -> cập nhật lại số đo khi kích thước đổi
  new ResizeObserver(() => { updateThreshold(); detectStuck(); measureZ(); }).observe(document.querySelector('.app'));

  renderSticky();
  renderZ();
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
