/**
 * Selectors for elements that should be stripped from the exported Markdown.
 * These represent navigation, feedback widgets, copy buttons, and site chrome.
 */
const STRIP_SELECTORS = [
  'nav',
  '[class*="breadcrumb"]',
  '[class*="feedback"]',
  '.vote-button',
  '.vote-buttons-container',
  '.vote-response',
  '[class*="copy"]',
  '.pre-header button',
  'footer',
  '[class*="layout-sidebar"]',
  '[class*="table-of-contents"]',
  '[class*="next-previous"]',
  '[class*="banner"]',
  '[class*="eol-banner"]',
  '[class*="skip-to-main"]',
  '[class*="page-last-updated"]'
];

/**
 * Remove all elements matching strip selectors from the cloned DOM.
 */
function stripElements(root: HTMLElement): void {
  const selector = STRIP_SELECTORS.join(', ');
  const toRemove = root.querySelectorAll(selector);
  toRemove.forEach((el) => el.remove());
}

/**
 * Get the language from a code block's class list (e.g. "language-typescript" -> "typescript").
 */
function getCodeLanguage(el: HTMLElement): string {
  const classes = Array.from(el.classList || []);
  for (const cls of classes) {
    if (cls.startsWith('language-')) {
      return cls.replace('language-', '');
    }
  }
  // Check parent <pre> or child <code> for language class
  const codeEl = el.tagName === 'PRE' ? el.querySelector('code') : null;
  if (codeEl) {
    return getCodeLanguage(codeEl);
  }
  return '';
}

/**
 * Get the text content of an element, trimming whitespace.
 */
function getTextContent(el: HTMLElement): string {
  return (el.textContent || '').trim();
}

/**
 * Convert a table element to Markdown table syntax.
 */
function convertTable(table: HTMLElement): string {
  const rows = Array.from(table.querySelectorAll('tr'));
  if (rows.length === 0) return '';

  const result: string[] = [];

  rows.forEach((row, rowIndex) => {
    const cells = Array.from(row.querySelectorAll('th, td'));
    const cellTexts = cells.map((cell) =>
      convertInlineContent(cell as HTMLElement)
        .replace(/\|/g, '\\|')
        .replace(/\n/g, ' ')
    );
    result.push(`| ${cellTexts.join(' | ')} |`);

    // Add separator after header row
    if (rowIndex === 0) {
      const separator = cells.map(() => '---').join(' | ');
      result.push(`| ${separator} |`);
    }
  });

  return result.join('\n');
}

/**
 * Convert list items to Markdown, handling nested lists.
 */
function convertList(el: HTMLElement, indent: number = 0): string {
  const items = Array.from(el.children);
  const isOrdered = el.tagName === 'OL';
  const lines: string[] = [];
  const prefix = '  '.repeat(indent);

  items.forEach((item, index) => {
    if (item.tagName !== 'LI') return;

    const marker = isOrdered ? `${index + 1}.` : '-';
    const children = Array.from(item.childNodes);
    let inlineContent = '';
    const subLists: string[] = [];

    children.forEach((child) => {
      if (
        child.nodeType === 1 &&
        ((child as HTMLElement).tagName === 'UL' ||
          (child as HTMLElement).tagName === 'OL')
      ) {
        subLists.push(convertList(child as HTMLElement, indent + 1));
      } else if (child.nodeType === 1) {
        inlineContent += convertInlineContent(child as HTMLElement);
      } else if (child.nodeType === 3) {
        inlineContent += child.textContent || '';
      }
    });

    lines.push(`${prefix}${marker} ${inlineContent.trim()}`);
    subLists.forEach((sub) => lines.push(sub));
  });

  return lines.join('\n');
}

/**
 * Convert inline HTML content to Markdown (bold, italic, code, links).
 */
function convertInlineContent(el: HTMLElement): string {
  let result = '';

  el.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      // Text node
      result += node.textContent || '';
      return;
    }

    if (node.nodeType !== 1) return;

    const child = node as HTMLElement;
    const tag = child.tagName;

    switch (tag) {
      case 'STRONG':
      case 'B': {
        const inner = convertInlineContent(child);
        result += `**${inner.trim()}**`;
        break;
      }
      case 'EM':
      case 'I': {
        const inner = convertInlineContent(child);
        result += `*${inner.trim()}*`;
        break;
      }
      case 'CODE': {
        const text = child.textContent || '';
        result += `\`${text}\``;
        break;
      }
      case 'A': {
        const href = child.getAttribute('href') || '';
        const inner = convertInlineContent(child);
        result += `[${inner.trim()}](${href})`;
        break;
      }
      case 'BR': {
        result += '\n';
        break;
      }
      case 'IMG': {
        const alt = child.getAttribute('alt') || '';
        const src = child.getAttribute('src') || '';
        result += `![${alt}](${src})`;
        break;
      }
      default: {
        result += convertInlineContent(child);
        break;
      }
    }
  });

  return result;
}

/**
 * Convert a Callout component (amplify-message) to a Markdown blockquote.
 * Preserves the callout type (warning/info) as a prefix.
 */
function convertCallout(el: HTMLElement): string {
  const isWarning =
    el.getAttribute('colortheme') === 'warning' ||
    el.classList.contains('amplify-message--warning') ||
    el.querySelector('[aria-label="Warning"]') !== null;

  const contentEl = el.querySelector('.amplify-message__content');
  const content = contentEl
    ? convertInlineContent(contentEl as HTMLElement).trim()
    : getTextContent(el);

  const prefix = isWarning ? '> ⚠️ **Warning**' : '> ℹ️ **Note**';
  const lines = content.split('\n').map((line) => `> ${line}`);

  return `${prefix}\n${lines.join('\n')}`;
}

/**
 * Check if an element itself is a Callout/Message component.
 * Only checks the element's own attributes, not descendants.
 */
function isCallout(el: HTMLElement): boolean {
  return (
    el.classList.contains('amplify-message') ||
    el.getAttribute('data-amplify-component') === 'Message'
  );
}

/**
 * Check if an element is a code block container.
 */
function isCodeBlock(el: HTMLElement): boolean {
  return (
    el.classList.contains('code-block') ||
    el.classList.contains('pre-container') ||
    (el.tagName === 'PRE' && el.querySelector('code') !== null)
  );
}

/**
 * Extract code content and language from a code block element.
 */
function extractCodeBlock(el: HTMLElement): { code: string; language: string } {
  // Look for the actual <pre> and <code> elements
  const pre = el.tagName === 'PRE' ? el : el.querySelector('pre');
  const code = pre ? pre.querySelector('code') : el.querySelector('code');

  const language = pre
    ? getCodeLanguage(pre as HTMLElement)
    : code
      ? getCodeLanguage(code as HTMLElement)
      : '';

  // Get the raw text content from the code element
  const codeText = code
    ? (code.textContent || '').replace(/\n$/, '')
    : pre
      ? (pre.textContent || '').replace(/\n$/, '')
      : '';

  return { code: codeText, language };
}

/**
 * Convert a single block-level node to Markdown.
 */
function convertBlockNode(el: HTMLElement): string {
  const tag = el.tagName;

  // Headings
  if (/^H[1-6]$/.test(tag)) {
    const level = parseInt(tag[1], 10);
    const hashes = '#'.repeat(level);
    const text = convertInlineContent(el).trim();
    return `${hashes} ${text}`;
  }

  // Callout components
  if (isCallout(el)) {
    return convertCallout(el);
  }

  // Code blocks
  if (isCodeBlock(el)) {
    const { code, language } = extractCodeBlock(el);
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }

  // Standalone <pre> with <code>
  if (tag === 'PRE') {
    const { code, language } = extractCodeBlock(el);
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }

  // Tables
  if (tag === 'TABLE') {
    return convertTable(el);
  }

  // Lists
  if (tag === 'UL' || tag === 'OL') {
    return convertList(el);
  }

  // Horizontal rule
  if (tag === 'HR') {
    return '---';
  }

  // Blockquote
  if (tag === 'BLOCKQUOTE') {
    const inner = convertNode(el).trim();
    return inner
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n');
  }

  // Paragraphs and generic divs
  if (tag === 'P') {
    const text = convertInlineContent(el).trim();
    return text;
  }

  // For divs and other containers, recurse into children
  if (
    tag === 'DIV' ||
    tag === 'SECTION' ||
    tag === 'ARTICLE' ||
    tag === 'SPAN'
  ) {
    return convertNode(el);
  }

  // Fallback: try inline conversion
  const text = convertInlineContent(el).trim();
  return text;
}

/**
 * Recursively convert all child nodes of an element to Markdown.
 */
function convertNode(el: HTMLElement): string {
  const parts: string[] = [];

  el.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      // Text node
      const text = (node.textContent || '').trim();
      if (text) {
        parts.push(text);
      }
      return;
    }

    if (node.nodeType !== 1) return;

    const child = node as HTMLElement;
    const md = convertBlockNode(child);
    if (md.trim()) {
      parts.push(md);
    }
  });

  return parts.join('\n\n');
}

/**
 * Converts an HTML element (typically the `.main` content area) to Markdown.
 *
 * Strips navigation, feedback widgets, copy buttons, and site chrome.
 * Preserves headings, code blocks (with language), lists, tables, links,
 * and Callout components.
 *
 * @param htmlElement - The DOM element to convert (usually `.main`)
 * @param pageUrl - The current page URL (reserved for future link resolution)
 * @returns A Markdown string representation of the content
 */
export function htmlToMarkdown(
  htmlElement: HTMLElement,
  _pageUrl: string
): string {
  // Clone the element so we don't mutate the live DOM
  const clone = htmlElement.cloneNode(true) as HTMLElement;

  // Strip unwanted elements
  stripElements(clone);

  // Convert the cleaned HTML to Markdown
  return convertNode(clone).trim();
}

/** Exported for testing */
export {
  STRIP_SELECTORS,
  stripElements,
  convertInlineContent,
  convertTable,
  convertList
};
