/**
 * THUỘC TÍNH KIỂU CHỮ CSS (TYPOGRAPHY BASICS)
 * File: script.js
 */

(function () {
  'use strict';

  const defaultState = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#0f172a',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 1.6,
    fontWeight: 400
  };

  const state = { ...defaultState };

  const el = {
    selectFontFamily: document.getElementById('selectFontFamily'),
    inputColor: document.getElementById('inputColor'),
    colorHexText: document.getElementById('colorHexText'),
    rangeFontSize: document.getElementById('rangeFontSize'),
    fontSizeVal: document.getElementById('fontSizeVal'),
    rangeLineHeight: document.getElementById('rangeLineHeight'),
    lineHeightVal: document.getElementById('lineHeightVal'),
    fontWeightVal: document.getElementById('fontWeightVal'),
    targetText: document.getElementById('targetText'),
    typoCodeOutput: document.getElementById('typoCodeOutput'),
    btnCopy: document.getElementById('btnCopy'),
    btnReset: document.getElementById('btnReset')
  };

  const weightLabels = {
    400: '400 (Regular)',
    600: '600 (Semi-bold)',
    700: '700 (Bold)',
    800: '800 (Extra-bold)'
  };

  function updateTypography() {
    // Cập nhật DOM text
    el.targetText.style.fontFamily = state.fontFamily;
    el.targetText.style.color = state.color;
    el.targetText.style.textAlign = state.textAlign;
    el.targetText.style.fontSize = `${state.fontSize}px`;
    el.targetText.style.lineHeight = state.lineHeight;
    el.targetText.style.fontWeight = state.fontWeight;

    // Cập nhật nhãn giá trị
    el.fontSizeVal.textContent = `${state.fontSize}px`;
    el.lineHeightVal.textContent = state.lineHeight;
    el.fontWeightVal.textContent = weightLabels[state.fontWeight] || state.fontWeight;
    el.colorHexText.textContent = state.color.toUpperCase();

    // Sinh code CSS
    const familyShort = state.fontFamily.split(',')[0].replace(/['"]/g, '');
    el.typoCodeOutput.textContent = `p { font-family: ${familyShort}, sans-serif; font-size: ${state.fontSize}px; line-height: ${state.lineHeight}; font-weight: ${state.fontWeight}; color: ${state.color}; text-align: ${state.textAlign}; }`;
  }

  function setupEvents() {
    // Font family
    el.selectFontFamily.addEventListener('change', (e) => {
      state.fontFamily = e.target.value;
      updateTypography();
    });

    // Color
    el.inputColor.addEventListener('input', (e) => {
      state.color = e.target.value;
      updateTypography();
    });

    // Font size
    el.rangeFontSize.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value, 10);
      updateTypography();
    });

    // Line height
    el.rangeLineHeight.addEventListener('input', (e) => {
      state.lineHeight = parseFloat(e.target.value).toFixed(1);
      updateTypography();
    });

    // Text align segmented control
    document.querySelectorAll('.btn-segment').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-segment').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.textAlign = btn.dataset.align;
        updateTypography();
      });
    });

    // Font weight buttons
    document.querySelectorAll('.btn-weight').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-weight').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.fontWeight = parseInt(btn.dataset.weight, 10);
        updateTypography();
      });
    });

    // Copy button
    el.btnCopy.addEventListener('click', async () => {
      const text = el.typoCodeOutput.textContent;
      try {
        await navigator.clipboard.writeText(text);
        el.btnCopy.textContent = 'Đã chép';
        setTimeout(() => { el.btnCopy.textContent = 'Copy'; }, 1200);
      } catch (err) {
        el.btnCopy.textContent = 'Đã chép';
        setTimeout(() => { el.btnCopy.textContent = 'Copy'; }, 1200);
      }
    });

    // Reset button
    el.btnReset.addEventListener('click', () => {
      Object.assign(state, defaultState);

      el.selectFontFamily.value = defaultState.fontFamily;
      el.inputColor.value = defaultState.color;
      el.rangeFontSize.value = defaultState.fontSize;
      el.rangeLineHeight.value = defaultState.lineHeight;

      document.querySelectorAll('.btn-segment').forEach(b => {
        b.classList.toggle('active', b.dataset.align === defaultState.textAlign);
      });

      document.querySelectorAll('.btn-weight').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.weight, 10) === defaultState.fontWeight);
      });

      updateTypography();
    });
  }

  setupEvents();
  updateTypography();
})();
