/* ============================================================
   Bộ tô màu cú pháp HTML (kèm CSS trong <style>, JS trong <script>)
   Dùng chung cho editor (index.html) và thẻ ví dụ (example.html). Không phụ thuộc thư viện.
   Kết quả là chuỗi HTML gồm các <span class="tk-*">; mọi đoạn mã đều được escape.
   ============================================================ */

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Bọc đoạn text đã escape trong span có class màu tk-* */
function wrapToken(cls, text) {
  return '<span class="tk-' + cls + '">' + escapeHtml(text) + '</span>';
}

/**
 * Quét src bằng regex toàn cục; classify(match) trả về tên màu hoặc null.
 * Phần không khớp giữ nguyên (đã escape).
 */
function tokenize(src, regex, classify) {
  let out = '';
  let last = 0;
  let m;
  regex.lastIndex = 0;
  while ((m = regex.exec(src)) !== null) {
    if (m[0] === '') { regex.lastIndex++; continue; }
    out += escapeHtml(src.slice(last, m.index));
    const cls = classify(m);
    out += cls ? wrapToken(cls, m[0]) : escapeHtml(m[0]);
    last = regex.lastIndex;
  }
  return out + escapeHtml(src.slice(last));
}

/* Nhóm: 1 comment | 2 chuỗi | 3 số | 4 từ khóa | 5 tên hàm được gọi */
const JS_TOKEN = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?|`(?:[^`\\]|\\[\s\S])*`?)|\b(\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|try|catch|finally|throw|typeof|instanceof|in|of|async|await|this|null|undefined|true|false)\b|([A-Za-z_$][\w$]*)(?=\s*\()/g;

/** Tô màu JavaScript trong thẻ <script> */
function highlightJs(src) {
  return tokenize(src, JS_TOKEN, (m) => {
    if (m[1] !== undefined) return 'cmt';
    if (m[2] !== undefined) return 'jstr';
    if (m[3] !== undefined) return 'num';
    if (m[4] !== undefined) return 'kw';
    if (m[5] !== undefined) return 'fn';
    return null;
  });
}

const CSS_TOKEN = /(\/\*[\s\S]*?(?:\*\/|$))|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|([{}])|(:)|(;)|([^{}:;"'\/]+|\/)/g;

/** Tô màu CSS trong thẻ <style>: selector / property / value theo vị trí trong khối { } */
function highlightCss(src) {
  let depth = 0;
  let inValue = false;
  return tokenize(src, CSS_TOKEN, (m) => {
    if (m[1] !== undefined) return 'cmt';
    if (m[2] !== undefined) return 'val';
    if (m[3] !== undefined) {
      depth = Math.max(0, depth + (m[3] === '{' ? 1 : -1));
      inValue = false;
      return null;
    }
    if (m[4] !== undefined) {
      if (depth > 0 && !inValue) { inValue = true; return null; }
      return depth === 0 ? 'sel' : null;   // a:hover ngoài khối là selector
    }
    if (m[5] !== undefined) { inValue = false; return null; }
    if (depth === 0) return 'sel';
    if (inValue) return 'val';
    return src[m.index + m[0].length] === '{' ? 'sel' : 'prop'; // selector lồng trong @media
  });
}

/** Tô màu thực thể như &amp; &lt; trong nội dung văn bản */
function highlightText(text) {
  return tokenize(text, /&(?:#\d+|#x[\da-f]+|\w+);/gi, () => 'ent');
}

/** Tô màu tài liệu HTML; nội dung <script> và <style> chuyển cho highlightJs / highlightCss */
function highlightHtml(src) {
  const DOCTYPE = /<![^>]*>?/y;
  const TAG_OPEN = /<(\/?)([a-zA-Z][\w:-]*)/y;
  const ATTR = /(\s+)|(\/?>)|(=)|("[^"]*"?|'[^']*'?)|([^\s"'<>\/=]+)|(\/)/y;
  const n = src.length;
  let out = '';
  let i = 0;

  while (i < n) {
    const lt = src.indexOf('<', i);
    if (lt === -1) { out += highlightText(src.slice(i)); break; }
    out += highlightText(src.slice(i, lt));
    i = lt;

    // Chú thích <!-- ... -->
    if (src.startsWith('<!--', i)) {
      const close = src.indexOf('-->', i + 4);
      const end = close === -1 ? n : close + 3;
      out += wrapToken('cmt', src.slice(i, end));
      i = end;
      continue;
    }

    // <!DOCTYPE html>
    if (src[i + 1] === '!') {
      DOCTYPE.lastIndex = i;
      DOCTYPE.exec(src);
      out += wrapToken('doc', src.slice(i, DOCTYPE.lastIndex));
      i = DOCTYPE.lastIndex;
      continue;
    }

    // Thẻ mở / đóng
    TAG_OPEN.lastIndex = i;
    const tag = TAG_OPEN.exec(src);
    if (!tag) { out += '&lt;'; i++; continue; }
    out += wrapToken('punct', '<' + tag[1]) + wrapToken('tag', tag[2]);
    i = TAG_OPEN.lastIndex;

    // Thuộc tính cho tới dấu > (dừng nếu gặp < khi thẻ chưa đóng)
    let closed = false;
    let afterEq = false;
    while (i < n && src[i] !== '<') {
      ATTR.lastIndex = i;
      const a = ATTR.exec(src);
      if (!a) break;
      i = ATTR.lastIndex;
      if (a[1] !== undefined) { out += a[1]; continue; }
      if (a[2] !== undefined) { out += wrapToken('punct', a[2]); closed = a[2] === '>'; break; }
      if (a[3] !== undefined) { out += wrapToken('punct', a[3]); afterEq = true; continue; }
      if (a[4] !== undefined) out += wrapToken('str', a[4]);
      else if (a[5] !== undefined) out += wrapToken(afterEq ? 'str' : 'attr', a[5]);
      else out += escapeHtml(a[0]);
      afterEq = false;
    }

    // Nội dung thô của <script> / <style>
    const name = tag[2].toLowerCase();
    if (closed && !tag[1] && (name === 'script' || name === 'style')) {
      const closeTag = new RegExp('</' + name, 'ig');
      closeTag.lastIndex = i;
      const found = closeTag.exec(src);
      const end = found ? found.index : n;
      const body = src.slice(i, end);
      out += name === 'script' ? highlightJs(body) : highlightCss(body);
      i = end;
    }
  }
  return out;
}
