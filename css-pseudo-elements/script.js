document.addEventListener('DOMContentLoaded', () => {
  const caseButtons = document.querySelectorAll('.btn-case');
  const checkBefore = document.getElementById('checkBefore');
  const checkAfter = document.getElementById('checkAfter');
  const inputContent = document.getElementById('inputContent');

  const slotBefore = document.getElementById('slotBefore');
  const slotAfter = document.getElementById('slotAfter');
  const valBefore = document.getElementById('valBefore');
  const valAfter = document.getElementById('valAfter');

  const demoTarget = document.getElementById('demoTarget');
  const targetText = document.getElementById('targetText');
  const pseudoCodeOutput = document.getElementById('pseudoCodeOutput');

  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');

  let currentCase = 'quote';

  const caseData = {
    quote: {
      text: 'Kiến thức là sức mạnh',
      defaultBefore: true,
      defaultAfter: true,
      beforeVal: '“',
      afterVal: '”',
      contentInput: '"“"',
      code: '.box::before { content: "“"; font-size: 1.2rem; color: #22c55e; }\n.box::after { content: "”"; font-size: 1.2rem; color: #f97316; }'
    },
    badge: {
      text: 'Khóa học Front-end Pro',
      defaultBefore: false,
      defaultAfter: true,
      beforeVal: 'None',
      afterVal: 'HOT',
      contentInput: '"HOT"',
      code: '.card { position: relative; }\n.card::after { content: "HOT"; position: absolute; top: -8px; right: -8px; background: #ef4444; border-radius: 10px; }'
    },
    underline: {
      text: 'Khám phá bộ chọn CSS',
      defaultBefore: false,
      defaultAfter: true,
      beforeVal: 'None',
      afterVal: '"" (Thanh ngang)',
      contentInput: '""',
      code: '.title { position: relative; }\n.title::after { content: ""; position: absolute; bottom: 0; left: 10%; width: 80%; height: 3px; background: linear-gradient(90deg, #38bdf8, #818cf8); }'
    },
    bullet: {
      text: 'Bài 01: Cấu trúc trang web chuẩn',
      defaultBefore: true,
      defaultAfter: false,
      beforeVal: '▶',
      afterVal: 'None',
      contentInput: '"▶"',
      code: 'li { list-style: none; }\nli::before { content: "▶"; color: #22c55e; margin-right: 8px; font-size: 0.85rem; }'
    }
  };

  function update() {
    const data = caseData[currentCase];
    demoTarget.className = `demo-target case-${currentCase}`;
    targetText.textContent = data.text;

    const isBeforeOn = checkBefore.checked;
    const isAfterOn = checkAfter.checked;

    // Anatomy slots
    slotBefore.classList.toggle('is-off', !isBeforeOn);
    slotAfter.classList.toggle('is-off', !isAfterOn);

    valBefore.textContent = isBeforeOn ? `"${data.beforeVal}"` : '(Đã tắt)';
    valAfter.textContent = isAfterOn ? `"${data.afterVal}"` : '(Đã tắt)';

    // Real element CSS variables & classes
    if (isBeforeOn) {
      demoTarget.classList.add('has-before');
      demoTarget.style.setProperty('--before-content', `"${data.beforeVal}"`);
    } else {
      demoTarget.classList.remove('has-before');
    }

    if (isAfterOn) {
      demoTarget.classList.add('has-after');
      demoTarget.style.setProperty('--after-content', `"${data.afterVal}"`);
    } else {
      demoTarget.classList.remove('has-after');
    }

    pseudoCodeOutput.textContent = data.code;
  }

  function setCase(caseKey) {
    currentCase = caseKey;
    caseButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.case === caseKey);
    });

    const data = caseData[caseKey];
    checkBefore.checked = data.defaultBefore;
    checkAfter.checked = data.defaultAfter;
    inputContent.value = data.contentInput;

    update();
  }

  caseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setCase(btn.dataset.case);
    });
  });

  checkBefore.addEventListener('change', update);
  checkAfter.addEventListener('change', update);

  inputContent.addEventListener('input', () => {
    const rawVal = inputContent.value.replace(/['"]/g, '');
    if (checkBefore.checked) {
      demoTarget.style.setProperty('--before-content', `"${rawVal}"`);
      valBefore.textContent = `"${rawVal}"`;
    }
    if (checkAfter.checked) {
      demoTarget.style.setProperty('--after-content', `"${rawVal}"`);
      valAfter.textContent = `"${rawVal}"`;
    }
  });

  btnReset.addEventListener('click', () => {
    setCase('quote');
  });

  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(pseudoCodeOutput.textContent).then(() => {
      const orig = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => btnCopy.textContent = orig, 1500);
    });
  });

  setCase('quote');
});
