/** Extract inner HTML from a <div> whose opening tag matches `openPattern`. */
function extractBalancedDivInner(html, openPattern) {
  const openTag = html.match(new RegExp(`<div[^>]*${openPattern.source}[^>]*>`, 'i'));
  if (!openTag || openTag.index === undefined) return null;

  const contentStart = openTag.index + openTag[0].length;
  let depth = 1;
  let index = contentStart;

  while (index < html.length && depth > 0) {
    const lower = html.toLowerCase();
    const nextOpen = lower.indexOf('<div', index);
    const nextClose = lower.indexOf('</div>', index);

    if (nextClose === -1) return null;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 4;
      continue;
    }

    depth -= 1;
    if (depth === 0) return html.slice(contentStart, nextClose).trim();
    index = nextClose + 6;
  }

  return null;
}

function unwrapChatContainers(html) {
  if (/markdown prose/i.test(html)) {
    const prose = extractBalancedDivInner(html, /class="markdown prose/i);
    if (prose) return prose;
  }

  if (/react-scroll-to-bottom|bg-gray-50|dark:bg-\[#444654\]/i.test(html)) {
    const semanticMatch = html.match(/<(p|h[1-6]|ol|ul|img|figure|blockquote)\b/i);
    if (semanticMatch?.index !== undefined && semanticMatch.index > 0) {
      return html.slice(semanticMatch.index).trim();
    }
  }

  return html;
}

function stripImportedAttributes(html) {
  return html
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sid="[^"]*"/gi, '')
    .replace(/(<img\b[^>]*)\s+width="[^"]*"/gi, '$1')
    .replace(/(<img\b[^>]*)\s+height="[^"]*"/gi, '$1')
    .replace(/(<img\b[^>]*)\s+srcset="[^"]*"/gi, '$1')
    .replace(/(<img\b[^>]*)\s+sizes="[^"]*"/gi, '$1')
    .replace(/(<img\b[^>]*)\s+decoding="[^"]*"/gi, '$1')
    .replace(/(<img\b[^>]*)\s+loading="[^"]*"/gi, '$1')
    .replace(/(<img\b[^>]*)\s+aria-describedby="[^"]*"/gi, '$1');
}

function unwrapRedundantDivs(html) {
  let result = html;

  for (let pass = 0; pass < 24; pass += 1) {
    const next = result
      .replace(/<div>\s*(<(?:p|h[1-6]|ol|ul|li|img|figure|blockquote)\b[\s\S]*?)\s*<\/div>/gi, '$1')
      .replace(/<div>\s*<\/div>/gi, '');

    if (next === result) break;
    result = next;
  }

  return result;
}

function cleanupImportedHtml(html) {
  return html
    .replace(/<p>\s*&nbsp;\s*<\/p>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function sanitizeBlogHtml(html) {
  if (!html?.trim()) return html ?? '';

  let result = html.trim();

  if (
    /markdown prose|react-scroll-to-bottom|bg-gray-50|dark:bg-\[#444654\]|et_pb_|et_post_meta_wrapper/i.test(
      result
    )
  ) {
    result = unwrapChatContainers(result);
  }

  result = stripImportedAttributes(result);
  result = unwrapRedundantDivs(result);

  return cleanupImportedHtml(result);
}
