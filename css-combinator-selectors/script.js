document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-comb');
  const explainBadge = document.getElementById('explainBadge');
  const explainTitle = document.getElementById('explainTitle');
  const explainDesc = document.getElementById('explainDesc');
  const matchCount = document.getElementById('matchCount');
  const codeOutput = document.getElementById('codeOutput');

  const nodeP1 = document.getElementById('nodeP1');
  const nodeP2 = document.getElementById('nodeP2');
  const nodeP3 = document.getElementById('nodeP3');

  const tagP1 = document.getElementById('tagP1');
  const tagP2 = document.getElementById('tagP2');
  const tagP3 = document.getElementById('tagP3');

  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  const data = {
    descendant: {
      badge: 'Khoảng trắng (Space)',
      title: 'Bộ chọn Hậu duệ: .card p',
      desc: 'Chọn TẤT CẢ các thẻ <code>&lt;p&gt;</code> nằm bên trong <code>.card</code>, bất kể chúng là con trực tiếp F1 hay cháu chắt F2 lồng sâu bên trong.',
      count: '3 phần tử',
      code: '.card p { color: #38bdf8; font-weight: 700; }',
      p1: { match: true, text: 'MATCH (Hậu duệ F1)' },
      p2: { match: true, text: 'MATCH (Hậu duệ F2)' },
      p3: { match: true, text: 'MATCH (Hậu duệ F1)' }
    },
    child: {
      badge: 'Dấu lớn hơn (>)',
      title: 'Bộ chọn Con trực tiếp: .card > p',
      desc: 'Chỉ chọn các thẻ <code>&lt;p&gt;</code> là con trực tiếp cấp F1 của <code>.card</code>. Thẻ <code>&lt;p&gt;</code> nằm lồng trong <code>.sub-box</code> là cấp cháu nên BỊ BỎ QUA.',
      count: '2 phần tử',
      code: '.card > p { color: #38bdf8; font-weight: 700; }',
      p1: { match: true, text: 'MATCH (Con F1)' },
      p2: { match: false, text: 'BỎ QUA (Cấp cháu F2)' },
      p3: { match: true, text: 'MATCH (Con F1)' }
    },
    adjacent: {
      badge: 'Dấu cộng (+)',
      title: 'Bộ chọn Anh em liền kề: h3 + p',
      desc: 'Chỉ chọn ĐÚNG DUY NHẤT một phần tử <code>&lt;p&gt;</code> nằm ngay sát phía sau <code>&lt;h3&gt;</code> và có cùng phần tử cha.',
      count: '1 phần tử',
      code: 'h3 + p { color: #38bdf8; font-weight: 700; }',
      p1: { match: true, text: 'MATCH (Liền kề sát h3)' },
      p2: { match: false, text: 'BỎ QUA (Khác thẻ cha)' },
      p3: { match: false, text: 'BỎ QUA (Không liền kề h3)' }
    },
    general: {
      badge: 'Dấu ngã (~)',
      title: 'Bộ chọn Anh em chung: h3 ~ p',
      desc: 'Chọn TẤT CẢ các thẻ <code>&lt;p&gt;</code> có cùng phần tử cha và đứng phía sau <code>&lt;h3&gt;</code> (không bắt buộc phải đứng liền kề sát nhau).',
      count: '2 phần tử',
      code: 'h3 ~ p { color: #38bdf8; font-weight: 700; }',
      p1: { match: true, text: 'MATCH (Anh em sau h3)' },
      p2: { match: false, text: 'BỎ QUA (Khác thẻ cha)' },
      p3: { match: true, text: 'MATCH (Anh em sau h3)' }
    }
  };

  function setNodeState(node, tag, state) {
    if (state.match) {
      node.classList.remove('is-missed');
      node.classList.add('is-matched');
      tag.className = 'match-tag tag-match';
      tag.textContent = state.text;
    } else {
      node.classList.remove('is-matched');
      node.classList.add('is-missed');
      tag.className = 'match-tag tag-miss';
      tag.textContent = state.text;
    }
  }

  function applyCombinator(type) {
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

    const info = data[type];
    explainBadge.textContent = info.badge;
    explainTitle.textContent = info.title;
    explainDesc.innerHTML = info.desc;
    matchCount.textContent = info.count;
    codeOutput.textContent = info.code;

    setNodeState(nodeP1, tagP1, info.p1);
    setNodeState(nodeP2, tagP2, info.p2);
    setNodeState(nodeP3, tagP3, info.p3);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyCombinator(btn.dataset.type);
    });
  });

  btnReset.addEventListener('click', () => {
    applyCombinator('descendant');
  });

  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => {
        btnCopy.textContent = originalText;
      }, 1500);
    });
  });

  applyCombinator('descendant');
});
