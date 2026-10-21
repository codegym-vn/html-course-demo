/**
 * BA CÁCH VIẾT CSS (INLINE, INTERNAL, EXTERNAL)
 * File: script.js
 */

(function () {
  'use strict';

  const state = {
    inline: true,
    internal: true,
    external: true
  };

  const el = {
    checkInline: document.getElementById('checkInline'),
    checkInternal: document.getElementById('checkInternal'),
    checkExternal: document.getElementById('checkExternal'),
    cardInline: document.getElementById('cardInline'),
    cardInternal: document.getElementById('cardInternal'),
    cardExternal: document.getElementById('cardExternal'),
    bannerWinner: document.getElementById('bannerWinner'),
    targetParagraph: document.getElementById('targetParagraph'),
    ruleList: document.getElementById('ruleList'),
    compositeCodeOutput: document.getElementById('compositeCodeOutput'),
    btnCopy: document.getElementById('btnCopy'),
    btnReset: document.getElementById('btnReset')
  };

  function updateCascade() {
    // Cập nhật giao diện card
    el.cardInline.classList.toggle('disabled', !state.inline);
    el.cardInternal.classList.toggle('disabled', !state.internal);
    el.cardExternal.classList.toggle('disabled', !state.external);

    // Tính toán độ ưu tiên màu sắc (Color Conflict)
    let winningColor = '#0f172a';
    let winningSource = 'Mặc định của trình duyệt';

    if (state.inline) {
      winningColor = '#ef4444';
      winningSource = 'Inline CSS (#ef4444 - Đỏ)';
    } else if (state.internal) {
      winningColor = '#22c55e';
      winningSource = 'Internal CSS (#22c55e - Xanh lá)';
    } else if (state.external) {
      winningColor = '#3b82f6';
      winningSource = 'External CSS (#3b82f6 - Xanh dương)';
    }

    el.bannerWinner.textContent = winningSource;
    el.targetParagraph.style.color = winningColor;

    // Gộp các thuộc tính không xung đột (Property Merging)
    el.targetParagraph.style.fontWeight = state.inline ? 'bold' : 'normal';
    el.targetParagraph.style.textDecoration = state.internal ? 'underline' : 'none';
    el.targetParagraph.style.fontStyle = state.external ? 'italic' : 'normal';

    // Danh sách tóm tắt thuộc tính thực tế
    el.ruleList.innerHTML = '';

    const addRuleItem = (text) => {
      const li = document.createElement('li');
      li.textContent = text;
      el.ruleList.appendChild(li);
    };

    addRuleItem(`color: ${winningColor} (Thắng bởi ${winningSource.split(' ')[0]})`);

    if (state.inline) addRuleItem('font-weight: bold (Từ Inline)');
    if (state.internal) addRuleItem('text-decoration: underline (Từ Internal)');
    if (state.external) addRuleItem('font-style: italic (Từ External)');

    if (!state.inline && !state.internal && !state.external) {
      addRuleItem('Toàn bộ thuộc tính đang dùng mặc định của trình duyệt');
    }

    // Sinh code HTML đại diện
    const inlineAttr = state.inline ? ' style="color: #ef4444; font-weight: bold;"' : '';
    el.compositeCodeOutput.textContent = `<p${inlineAttr}>Dòng chữ này đang chịu tác động...</p>`;
  }

  function setupEvents() {
    el.checkInline.addEventListener('change', (e) => {
      state.inline = e.target.checked;
      updateCascade();
    });

    el.checkInternal.addEventListener('change', (e) => {
      state.internal = e.target.checked;
      updateCascade();
    });

    el.checkExternal.addEventListener('change', (e) => {
      state.external = e.target.checked;
      updateCascade();
    });

    el.btnCopy.addEventListener('click', async () => {
      const text = el.compositeCodeOutput.textContent;
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
      state.inline = true;
      state.internal = true;
      state.external = true;
      el.checkInline.checked = true;
      el.checkInternal.checked = true;
      el.checkExternal.checked = true;
      updateCascade();
    });
  }

  setupEvents();
  updateCascade();
})();
