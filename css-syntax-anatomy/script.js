/**
 * GIẢI PHẪU CÚ PHÁP CSS (CSS SYNTAX ANATOMY)
 * File: script.js
 */

(function () {
  'use strict';

  const scenarios = {
    correct: {
      prop1: 'color',
      val1: '#ffffff',
      semi1: ';',
      prop2: 'background-color',
      val2: '#2563eb',
      status: 'Cú pháp hoàn toàn hợp lệ',
      statusClass: 'status-ok',
      desc: 'Trình duyệt đọc hiểu trọn vẹn Selector và khối Declaration Block, áp dụng cả 2 thuộc tính: chữ trắng (#ffffff) và nền xanh (#2563eb).',
      btnStyle: {
        color: '#ffffff',
        backgroundColor: '#2563eb',
        borderColor: '#1d4ed8'
      },
      code: '.btn {\n  color: #ffffff;\n  background-color: #2563eb;\n}'
    },
    'missing-semi': {
      prop1: 'color',
      val1: '#ffffff',
      semi1: '', // Thiếu dấu chấm phẩy
      prop2: 'background-color',
      val2: '#2563eb',
      status: 'Lỗi: Thiếu dấu chấm phẩy (;)',
      statusClass: 'status-error',
      desc: 'Cạm bẫy kinh điển: Không có dấu chấm phẩy ngăn cách, trình duyệt ghép "#ffffff background-color:" thành một giá trị rác vô nghĩa và BỎ QUA CẢ HAI THUỘC TÍNH!',
      btnStyle: {
        color: '#0f172a',
        backgroundColor: '#f1f5f9',
        borderColor: '#cbd5e1'
      },
      code: '.btn {\n  color: #ffffff /* Thiếu ; */\n  background-color: #2563eb;\n}'
    },
    'typo-prop': {
      prop1: 'colr', // Sai chính tả
      val1: '#ffffff',
      semi1: ';',
      prop2: 'background-color',
      val2: '#2563eb',
      status: 'Lỗi: Sai tên thuộc tính ("colr")',
      statusClass: 'status-error',
      desc: 'Trình duyệt không nhận diện được thuộc tính "colr" nên bỏ qua dòng này. Tuy nhiên, thuộc tính "background-color" vẫn hoạt động bình thường.',
      btnStyle: {
        color: '#0f172a', // Rớt về mặc định
        backgroundColor: '#2563eb',
        borderColor: '#1d4ed8'
      },
      code: '.btn {\n  colr: #ffffff; /* Thuộc tính không tồn tại */\n  background-color: #2563eb;\n}'
    }
  };

  const el = {
    tokenProp1: document.getElementById('tokenProp1'),
    tokenVal1: document.getElementById('tokenVal1'),
    tokenSemi1: document.getElementById('tokenSemi1'),
    tokenProp2: document.getElementById('tokenProp2'),
    tokenVal2: document.getElementById('tokenVal2'),
    analysisStatus: document.getElementById('analysisStatus'),
    analysisText: document.getElementById('analysisText'),
    demoBtn: document.getElementById('demoBtn'),
    syntaxCodeOutput: document.getElementById('syntaxCodeOutput'),
    btnCopy: document.getElementById('btnCopy'),
    btnReset: document.getElementById('btnReset')
  };

  function applyScenario(scenarioKey) {
    const data = scenarios[scenarioKey];
    if (!data) return;

    // Cập nhật token trên anatomy card
    el.tokenProp1.textContent = data.prop1;
    el.tokenVal1.textContent = data.val1;
    el.tokenProp2.textContent = data.prop2;
    el.tokenVal2.textContent = data.val2;

    if (data.semi1 === '') {
      el.tokenSemi1.textContent = '[thiếu ;]';
      el.tokenSemi1.className = 'token-punct error-missing';
    } else {
      el.tokenSemi1.textContent = ';';
      el.tokenSemi1.className = 'token-punct';
    }

    // Cập nhật phân tích
    el.analysisStatus.textContent = data.status;
    el.analysisStatus.className = `analysis-status ${data.statusClass}`;
    el.analysisText.textContent = data.desc;

    // Cập nhật giao diện button render
    el.demoBtn.style.color = data.btnStyle.color;
    el.demoBtn.style.backgroundColor = data.btnStyle.backgroundColor;
    el.demoBtn.style.borderColor = data.btnStyle.borderColor;

    // Cập nhật active button
    document.querySelectorAll('.btn-scenario').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scenario === scenarioKey);
    });

    // Sinh code
    el.syntaxCodeOutput.textContent = data.code;
  }

  function setupEvents() {
    document.querySelectorAll('.btn-scenario').forEach(btn => {
      btn.addEventListener('click', () => {
        applyScenario(btn.dataset.scenario);
      });
    });

    el.btnCopy.addEventListener('click', async () => {
      const text = el.syntaxCodeOutput.textContent;
      try {
        await navigator.clipboard.writeText(text);
        el.btnCopy.textContent = 'Đã chép';
        setTimeout(() => { el.btnCopy.textContent = 'Copy'; }, 1200);
      } catch (err) {
        el.btnCopy.textContent = 'Đã chép';
        setTimeout(() => { el.btnCopy.textContent = 'Copy'; }, 1200);
      }
    });

    el.btnReset.addEventListener('click', () => {
      applyScenario('correct');
    });
  }

  setupEvents();
  applyScenario('correct');
})();
