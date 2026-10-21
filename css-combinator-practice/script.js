document.addEventListener('DOMContentLoaded', () => {
  const missionButtons = document.querySelectorAll('.btn-mission');
  const taskTag = document.getElementById('taskTag');
  const taskPrompt = document.getElementById('taskPrompt');
  const selectorInput = document.getElementById('selectorInput');
  const btnTest = document.getElementById('btnTest');
  const feedbackCard = document.getElementById('feedbackCard');
  const fbStatus = document.getElementById('fbStatus');
  const fbMsg = document.getElementById('fbMsg');
  const mockArticle = document.getElementById('mockArticle');
  const hintCode = document.getElementById('hintCode');
  const btnUseHint = document.getElementById('btnUseHint');
  const btnReset = document.getElementById('btnReset');
  const tokenButtons = document.querySelectorAll('.btn-token');

  let currentMission = 1;

  const missions = {
    1: {
      tag: 'Nhiệm vụ 1: Con trực tiếp (Child)',
      prompt: 'Chỉ chọn các thẻ <code>&lt;p&gt;</code> là con trực tiếp của bài viết (bỏ qua thẻ nằm lồng trong khối trích dẫn <code>.mock-quote</code>).',
      expectedIds: ['artP1', 'artP3'],
      hint: '.mock-article > p'
    },
    2: {
      tag: 'Nhiệm vụ 2: Liền kề sau h2 (Adjacent)',
      prompt: 'Chỉ chọn đúng DUY NHẤT một đoạn văn <code>&lt;p&gt;</code> nằm ngay sát phía sau tiêu đề <code>&lt;h2&gt;</code>.',
      expectedIds: ['artP1'],
      hint: 'h2 + p'
    },
    3: {
      tag: 'Nhiệm vụ 3: Hậu duệ menu (Descendant)',
      prompt: 'Chỉ chọn thẻ <code>&lt;li&gt;</code> nằm lồng bên trong menu con <code>.mock-sub-list</code>.',
      expectedIds: ['artLiSub'],
      hint: '.mock-sub-list li'
    },
    4: {
      tag: 'Nhiệm vụ 4: Anh em chung (General)',
      prompt: 'Chọn TẤT CẢ các đoạn văn <code>&lt;p&gt;</code> là anh em cùng cha đứng phía sau <code>&lt;h2&gt;</code>.',
      expectedIds: ['artP1', 'artP3'],
      hint: 'h2 ~ p'
    }
  };

  function clearHighlights() {
    mockArticle.querySelectorAll('.mock-el').forEach(el => {
      el.classList.remove('user-selected');
    });
  }

  function setMission(id) {
    currentMission = id;
    missionButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.id, 10) === id);
    });

    const m = missions[id];
    taskTag.textContent = m.tag;
    taskPrompt.innerHTML = m.prompt;
    hintCode.textContent = m.hint;
    selectorInput.value = '';
    clearHighlights();

    feedbackCard.className = 'feedback-card';
    fbStatus.textContent = 'Đang chờ bạn kiểm tra...';
    fbMsg.textContent = 'Nhập selector vào ô bên trên rồi nhấn nút "Kiểm tra".';
  }

  function testSelector() {
    const rawVal = selectorInput.value.trim();
    clearHighlights();

    if (!rawVal) {
      feedbackCard.className = 'feedback-card fb-wrong';
      fbStatus.textContent = 'Chưa nhập bộ chọn!';
      fbMsg.textContent = 'Vui lòng nhập cú pháp selector cần thử nghiệm vào ô input.';
      return;
    }

    let selectedElements = [];
    try {
      // Tìm kiếm trong phạm vi mockArticle
      selectedElements = Array.from(mockArticle.querySelectorAll(rawVal));
    } catch (e) {
      feedbackCard.className = 'feedback-card fb-wrong';
      fbStatus.textContent = 'Cú pháp không hợp lệ!';
      fbMsg.textContent = 'Trình duyệt không nhận diện được bộ chọn CSS này. Hãy kiểm tra lại dấu cách hoặc ký tự kết hợp.';
      return;
    }

    // Highlight
    selectedElements.forEach(el => el.classList.add('user-selected'));

    const m = missions[currentMission];
    const selectedIds = selectedElements.map(el => el.id);

    const isMatchAll = m.expectedIds.every(id => selectedIds.includes(id));
    const isNoExtras = selectedIds.length === m.expectedIds.length;

    if (isMatchAll && isNoExtras) {
      feedbackCard.className = 'feedback-card fb-correct';
      fbStatus.textContent = 'Chính xác! Bạn đã nhắm trúng mục tiêu.';
      fbMsg.textContent = `Đã khớp hoàn hảo ${selectedIds.length} phần tử yêu cầu theo đúng quan hệ kết hợp.`;
    } else {
      feedbackCard.className = 'feedback-card fb-wrong';
      fbStatus.textContent = 'Chưa chính xác!';
      if (selectedIds.length === 0) {
        fbMsg.textContent = 'Không có phần tử nào được khớp với bộ chọn này trong bài viết.';
      } else if (selectedIds.length > m.expectedIds.length) {
        fbMsg.textContent = `Bạn đã chọn dư ${selectedIds.length - m.expectedIds.length} phần tử không thuộc mục tiêu yêu cầu.`;
      } else {
        fbMsg.textContent = `Bạn đã chọn thiếu phần tử (khớp được ${selectedIds.length}/${m.expectedIds.length} phần tử).`;
      }
    }
  }

  missionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setMission(parseInt(btn.dataset.id, 10));
    });
  });

  btnTest.addEventListener('click', testSelector);

  selectorInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      testSelector();
    }
  });

  tokenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const token = btn.dataset.token;
      selectorInput.value += token;
      selectorInput.focus();
    });
  });

  btnUseHint.addEventListener('click', () => {
    selectorInput.value = missions[currentMission].hint;
    testSelector();
  });

  btnReset.addEventListener('click', () => {
    setMission(1);
  });

  setMission(1);
});
