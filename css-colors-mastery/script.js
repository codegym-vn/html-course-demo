/**
 * ============================================================================
 * HỆ MÀU SẮC CSS: HEX, RGB, RGBA
 * File: script.js
 * Logic điều khiển tương tác rút gọn tối ưu cho môi trường nhúng LMS (cao 600px)
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. Trạng thái màu mặc định
  const defaultState = {
    r: 59,
    g: 130,
    b: 246,
    a: 0.9
  };

  const state = { ...defaultState };

  // 2. DOM Elements
  const el = {
    // Red
    redRange: document.getElementById('redRange'),
    redNumber: document.getElementById('redNumber'),
    redHexVal: document.getElementById('redHexVal'),

    // Green
    greenRange: document.getElementById('greenRange'),
    greenNumber: document.getElementById('greenNumber'),
    greenHexVal: document.getElementById('greenHexVal'),

    // Blue
    blueRange: document.getElementById('blueRange'),
    blueNumber: document.getElementById('blueNumber'),
    blueHexVal: document.getElementById('blueHexVal'),

    // Alpha
    alphaRange: document.getElementById('alphaRange'),
    alphaNumber: document.getElementById('alphaNumber'),
    alphaPercent: document.getElementById('alphaPercent'),

    // Picker & Presets
    nativeColorPicker: document.getElementById('nativeColorPicker'),
    colorPickerHexText: document.getElementById('colorPickerHexText'),
    btnReset: document.getElementById('btnReset'),
    presetChips: document.getElementById('presetChips'),

    // Hex Anatomy
    hexRPart: document.getElementById('hexRPart'),
    hexGPart: document.getElementById('hexGPart'),
    hexBPart: document.getElementById('hexBPart'),
    hexAPart: document.getElementById('hexAPart'),
    hexRMath: document.getElementById('hexRMath'),
    hexGMath: document.getElementById('hexGMath'),
    hexBMath: document.getElementById('hexBMath'),
    hexAMath: document.getElementById('hexAMath'),
    formulaCode: document.getElementById('formulaCode'),

    // Previews & Contrast
    sampleHexDisplay: document.getElementById('sampleHexDisplay'),
    sampleRgbaDisplay: document.getElementById('sampleRgbaDisplay'),
    contrastDot: document.getElementById('contrastDot'),
    contrastText: document.getElementById('contrastText'),
    opacityLabel: document.getElementById('opacityLabel'),

    // CSS Code Outputs
    cssHexOutput: document.getElementById('cssHexOutput'),
    cssRgbaOutput: document.getElementById('cssRgbaOutput'),
    cssModernOutput: document.getElementById('cssModernOutput')
  };

  // 3. Hàm chuyển đổi
  function toHex2(val) {
    const clamped = Math.max(0, Math.min(255, Math.round(val)));
    return clamped.toString(16).padStart(2, '0').toUpperCase();
  }

  function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  // 4. Cập nhật giao diện
  function updateUI() {
    const { r, g, b, a } = state;

    const hexR = toHex2(r);
    const hexG = toHex2(g);
    const hexB = toHex2(b);
    const hexA = toHex2(Math.round(a * 255));
    const alphaPercentVal = Math.round(a * 100);

    const hex6 = `#${hexR}${hexG}${hexB}`;
    const rgbaStr = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    const modernStr = `rgb(${r} ${g} ${b} / ${alphaPercentVal}%)`;

    // Cập nhật CSS Variables
    document.documentElement.style.setProperty('--current-r', r);
    document.documentElement.style.setProperty('--current-g', g);
    document.documentElement.style.setProperty('--current-b', b);
    document.documentElement.style.setProperty('--current-a', a);
    document.documentElement.style.setProperty('--current-hex', hex6);

    // Đồng bộ Inputs
    el.redRange.value = r;
    el.redNumber.value = r;
    el.redHexVal.textContent = `Hex: ${hexR}`;

    el.greenRange.value = g;
    el.greenNumber.value = g;
    el.greenHexVal.textContent = `Hex: ${hexG}`;

    el.blueRange.value = b;
    el.blueNumber.value = b;
    el.blueHexVal.textContent = `Hex: ${hexB}`;

    el.alphaRange.value = alphaPercentVal;
    el.alphaNumber.value = a.toFixed(2);
    el.alphaPercent.textContent = `${alphaPercentVal}%`;

    el.nativeColorPicker.value = hex6;
    el.colorPickerHexText.textContent = hex6;

    // Giải mã Hex
    el.hexRPart.textContent = hexR;
    el.hexRMath.textContent = r;
    el.hexGPart.textContent = hexG;
    el.hexGMath.textContent = g;
    el.hexBPart.textContent = hexB;
    el.hexBMath.textContent = b;
    el.hexAPart.textContent = hexA;
    el.hexAMath.textContent = `${alphaPercentVal}%`;

    const highChar = hexR.charAt(0);
    const lowChar = hexR.charAt(1);
    el.formulaCode.textContent = `${hexR} = (${parseInt(highChar, 16)}×16) + ${parseInt(lowChar, 16)} = ${r}`;

    // Preview
    el.sampleHexDisplay.textContent = hex6;
    el.sampleRgbaDisplay.textContent = rgbaStr;
    el.opacityLabel.textContent = a.toFixed(2);

    // Độ tương phản
    const lum = getLuminance(r, g, b);
    const isLight = lum > 0.45;
    el.contrastText.textContent = isLight ? 'Chữ: Đen' : 'Chữ: Trắng';
    el.contrastDot.style.backgroundColor = isLight ? '#0f172a' : '#ffffff';

    // Xuất mã CSS
    el.cssHexOutput.textContent = `background-color: ${hex6};`;
    el.cssRgbaOutput.textContent = `background-color: rgba(${r}, ${g}, ${b}, ${a});`;
    el.cssModernOutput.textContent = `background-color: ${modernStr};`;
  }

  // 5. Lắng nghe sự kiện
  function setupEventListeners() {
    // Red
    el.redRange.addEventListener('input', (e) => {
      state.r = parseInt(e.target.value, 10);
      updateUI();
    });
    el.redNumber.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 0;
      state.r = Math.max(0, Math.min(255, val));
      updateUI();
    });

    // Green
    el.greenRange.addEventListener('input', (e) => {
      state.g = parseInt(e.target.value, 10);
      updateUI();
    });
    el.greenNumber.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 0;
      state.g = Math.max(0, Math.min(255, val));
      updateUI();
    });

    // Blue
    el.blueRange.addEventListener('input', (e) => {
      state.b = parseInt(e.target.value, 10);
      updateUI();
    });
    el.blueNumber.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 0;
      state.b = Math.max(0, Math.min(255, val));
      updateUI();
    });

    // Alpha
    el.alphaRange.addEventListener('input', (e) => {
      state.a = parseFloat((parseInt(e.target.value, 10) / 100).toFixed(2));
      updateUI();
    });
    el.alphaNumber.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      if (isNaN(val)) val = 0;
      state.a = parseFloat(Math.max(0, Math.min(1, val)).toFixed(2));
      updateUI();
    });

    // Color picker
    el.nativeColorPicker.addEventListener('input', (e) => {
      const hex = e.target.value;
      state.r = parseInt(hex.slice(1, 3), 16);
      state.g = parseInt(hex.slice(3, 5), 16);
      state.b = parseInt(hex.slice(5, 7), 16);
      updateUI();
    });

    // Preset dots
    el.presetChips.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (!dot) return;
      state.r = parseInt(dot.dataset.r, 10);
      state.g = parseInt(dot.dataset.g, 10);
      state.b = parseInt(dot.dataset.b, 10);
      state.a = parseFloat(dot.dataset.a || '1');
      updateUI();
    });

    // Reset
    el.btnReset.addEventListener('click', () => {
      state.r = defaultState.r;
      state.g = defaultState.g;
      state.b = defaultState.b;
      state.a = defaultState.a;
      updateUI();
    });

    // Copy buttons
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-target');
        const codeEl = document.getElementById(targetId);
        if (!codeEl) return;

        const text = codeEl.textContent.trim();
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Đã chép';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
        } catch (err) {
          const temp = document.createElement('textarea');
          temp.value = text;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
          btn.textContent = 'Đã chép';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
        }
      });
    });
  }

  setupEventListeners();
  updateUI();
})();
