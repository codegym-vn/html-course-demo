"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* ===== Dữ liệu ===== */
const hoverEffects = [
  {
    name: "Nâng và phóng to",
    description: "Nút nhích lên nhẹ, phóng to 5% và có bóng đổ rõ hơn.",
    css: `.demo-button {\n  transition: transform .25s ease, box-shadow .25s ease;\n}\n.demo-button:hover {\n  transform: translateY(-2px) scale(1.05);\n  box-shadow: 0 12px 28px -8px rgba(99, 102, 241, .65);\n}`
  },
  {
    name: "Dịch chuyển sang phải",
    description: "Nút dịch sang phải khi rê chuột; màu nền cũng đậm hơn.",
    css: `.demo-button {\n  transition: transform .2s ease, background-color .2s ease;\n}\n.demo-button:hover {\n  transform: translateX(8px);\n  background-color: #4338ca;\n}`
  },
  {
    name: "Viền phát sáng",
    description: "Bóng phát sáng làm nổi bật đường viền của nút.",
    css: `.demo-button {\n  transition: box-shadow .25s ease, border-color .25s ease;\n}\n.demo-button:hover {\n  box-shadow: 0 0 18px #818cf8, 0 0 36px rgba(99, 102, 241, .65);\n  border-color: #a5b4fc;\n}`
  },
  {
    name: "Đổi màu nền và chữ",
    description: "Nền chuyển trong suốt, chữ và viền chuyển sang màu tím nhạt.",
    css: `.demo-button {\n  transition: background-color .25s ease, color .25s ease;\n}\n.demo-button:hover {\n  background-color: transparent;\n  color: #c7d2fe;\n  border-color: #818cf8;\n}`
  }
];

const focusEffects = [
  {
    name: "Focus ring",
    description: "Vòng sáng bên ngoài giúp nhận biết rõ phần tử đang được focus.",
    css: (selector) => `${selector} {\n  border-color: #34d399;\n  box-shadow: 0 0 0 4px rgba(16, 185, 129, .22);\n}`
  },
  {
    name: "Nhấn mạnh viền dưới",
    description: "Viền dưới đổi màu để tạo chỉ báo tập trung tối giản.",
    css: (selector) => `${selector} {\n  border-bottom: 2px solid #34d399;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}`
  },
  {
    name: "Viền tương phản",
    description: "Viền dày và rõ hơn khi input nhận focus.",
    css: (selector) => `${selector} {\n  border: 2px solid #34d399;\n}`
  }
];

const nthPresets = [
  { label: "odd · vị trí lẻ", a: 2, b: 1 },
  { label: "even · vị trí chẵn", a: 2, b: 0 },
  { label: "3n · bội số 3", a: 3, b: 0 },
  { label: "3n + 1", a: 3, b: 1 },
  { label: "-n + 5 · 5 phần tử đầu", a: -1, b: 5 },
  { label: "n + 6 · từ vị trí 6", a: 1, b: 6 },
  { label: "0n + 4 · chỉ vị trí 4", a: 0, b: 4 },
  { label: "2n - 1", a: 2, b: -1 }
];

const NTH_COUNT = 12;

let selectedHover = 0;
let selectedFocus = 0;

/* ===== Thẻ lựa chọn (dùng chung cho hover và focus) ===== */
function renderOptions(container, effects, selectedIndex, dataKey) {
  container.innerHTML = effects.map((effect, index) => `
    <button type="button" class="option-card" role="radio" aria-checked="${index === selectedIndex}" data-${dataKey}="${index}">
      <span class="radio-dot" aria-hidden="true"></span>
      <span>
        <span class="option-name">${effect.name}</span>
        <span class="option-desc">${effect.description}</span>
      </span>
    </button>`).join("");
}

function markChecked(container, selectedIndex) {
  $$(".option-card", container).forEach((card, i) => {
    card.setAttribute("aria-checked", String(i === selectedIndex));
  });
}

/* ===== :hover ===== */
function selectHover(index) {
  selectedHover = index;
  const effect = hoverEffects[index];
  markChecked($("#hover-options"), index);
  // Chèn CSS thật: trình duyệt tự xử lý :hover, JS không can thiệp trạng thái chuột
  $("#dynamic-hover-style").textContent = effect.css;
  $("#hover-code").textContent = effect.css;
  $("#hover-description").textContent = effect.description;
}

/* ===== :focus ===== */
function selectFocus(index) {
  selectedFocus = index;
  markChecked($("#focus-options"), index);
  renderFocusDemo();
}

function renderFocusDemo() {
  const useVisible = $("#focus-visible-toggle").checked;
  const pseudo = useVisible ? ":focus-visible" : ":focus";
  // Tạo lại input để xóa focus cũ khi đổi kiểu
  $("#focus-preview").innerHTML = `
    <label for="focus-demo-input" class="focus-label">Tài khoản người dùng</label>
    <input id="focus-demo-input" type="text" autocomplete="off" placeholder="Nhập tên hoặc email..." class="focus-input">`;
  const effect = focusEffects[selectedFocus];
  $("#dynamic-focus-style").textContent = effect.css(`#focus-demo-input${pseudo}`);
  $("#focus-code").textContent = `/* ${pseudo} — ${effect.name} */\n${effect.css(`.my-input${pseudo}`)}`;
}

/* ===== :nth-child() ===== */
function formulaText(a, b) {
  if (a === 0) return String(b);
  const coefficient = a === 1 ? "" : a === -1 ? "-" : String(a);
  let result = `${coefficient}n`;
  if (b > 0) result += ` + ${b}`;
  if (b < 0) result += ` - ${Math.abs(b)}`;
  return result;
}

function nthMatches(position, a, b) {
  // An+B khớp vị trí k = a*n + b với n nguyên >= 0 và k >= 1
  if (a === 0) return position === b && b >= 1;
  const n = (position - b) / a;
  return Number.isInteger(n) && n >= 0;
}

function explanationFor(a, b) {
  if (a === 0) {
    return b >= 1
      ? `a = 0 nên công thức chỉ chọn vị trí ${b}; nếu vị trí này nằm trong danh sách, đúng một ô sẽ được tô sáng.`
      : "Công thức không tạo ra vị trí hợp lệ vì vị trí phải là số nguyên dương.";
  }
  if (a > 0) {
    return `Bắt đầu tại b = ${b}, sau đó tăng mỗi lần ${a} vị trí khi n = 0, 1, 2… Chỉ các vị trí nguyên dương mới được chọn.`;
  }
  return `Với a = ${a}, vị trí giảm dần từ b = ${b}. Chỉ giá trị nguyên dương được chọn; công thức này thường chọn một đoạn đầu danh sách.`;
}

function renderNth() {
  $("#nth-presets").innerHTML = nthPresets.map((preset, index) =>
    `<button type="button" class="preset-btn" data-preset="${index}">${preset.label}</button>`
  ).join("");

  $("#nth-grid").innerHTML = Array.from({ length: NTH_COUNT }, (_, i) => `
    <div class="nth-item" aria-label="Phần tử ${i + 1}">
      <span class="nth-item-label">Item</span>
      <span class="nth-item-num">${String(i + 1).padStart(2, "0")}</span>
    </div>`).join("");
}

function updateNth() {
  const a = Number($("#nth-a").value);
  const b = Number($("#nth-b").value);
  const formula = formulaText(a, b);
  const matches = [];
  for (let i = 1; i <= NTH_COUNT; i++) {
    if (nthMatches(i, a, b)) matches.push(i);
  }

  $("#nth-a-value").textContent = a;
  $("#nth-b-value").textContent = b;
  $("#nth-formula").textContent = formula;
  $("#nth-explanation").textContent = explanationFor(a, b);
  $("#nth-match-count").textContent = `${matches.length} phần tử được chọn`;

  $$(".nth-item", $("#nth-grid")).forEach((item, index) => {
    const match = matches.includes(index + 1);
    item.classList.toggle("is-matched", match);
    item.setAttribute("aria-label", `Phần tử ${index + 1}${match ? ", được chọn" : ""}`);
  });

  const css = `.nth-item:nth-child(${formula}) {\n  background-color: rgba(245, 158, 11, .18);\n  border-color: #f59e0b;\n  color: #fcd34d;\n  transform: translateY(-2px);\n}`;
  $("#dynamic-nth-style").textContent = css;
  $("#nth-code").textContent = css;
}

/* ===== Tabs ===== */
function switchTab(name, focusButton = false) {
  $$(".tab-btn").forEach(button => {
    const active = button.dataset.tab === name;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  $$(".tab-panel").forEach(panel => {
    panel.hidden = panel.id !== `panel-${name}`;
  });
  if (focusButton) $(`#tab-${name}`).focus();
}

/* ===== Sao chép ===== */
let toastTimeout;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function copyCode(id) {
  const text = $(`#${id}`).textContent;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Dự phòng khi mở file trực tiếp (file://) hoặc iframe không cho phép clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) throw new Error("Clipboard copy unavailable");
    }
    showToast("Đã sao chép mã CSS.");
  } catch (error) {
    showToast("Không thể sao chép tự động. Hãy chọn và sao chép mã.");
  }
}

/* ===== Sự kiện (event delegation) ===== */
document.addEventListener("click", event => {
  const tab = event.target.closest("[data-tab]");
  if (tab) switchTab(tab.dataset.tab);

  const hoverOption = event.target.closest("[data-hover-index]");
  if (hoverOption) selectHover(Number(hoverOption.dataset.hoverIndex));

  const focusOption = event.target.closest("[data-focus-index]");
  if (focusOption) selectFocus(Number(focusOption.dataset.focusIndex));

  const presetButton = event.target.closest("[data-preset]");
  if (presetButton) {
    const preset = nthPresets[Number(presetButton.dataset.preset)];
    $("#nth-a").value = preset.a;
    $("#nth-b").value = preset.b;
    updateNth();
  }

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) copyCode(copyButton.dataset.copy);
});

// Điều hướng tab bằng phím mũi tên / Home / End
$$(".tab-btn").forEach(button => {
  button.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tabs = $$(".tab-btn");
    const current = tabs.indexOf(button);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    switchTab(tabs[next].dataset.tab, true);
  });
});

$("#focus-visible-toggle").addEventListener("change", renderFocusDemo);
$("#nth-a").addEventListener("input", updateNth);
$("#nth-b").addEventListener("input", updateNth);

/* ===== Khởi tạo ===== */
renderOptions($("#hover-options"), hoverEffects, selectedHover, "hover-index");
renderOptions($("#focus-options"), focusEffects, selectedFocus, "focus-index");
renderNth();
selectHover(0);
renderFocusDemo();
updateNth();
