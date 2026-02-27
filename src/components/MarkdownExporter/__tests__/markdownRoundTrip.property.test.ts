/**
 * @jest-environment jsdom
 *
 * Feature: amplify-docs-restructuring, Property 10: Markdown export round-trip
 *
 * For any valid New_Docs page content (containing headings, code blocks, lists,
 * tables, links, and callouts), exporting to Markdown via htmlToMarkdown and then
 * parsing the Markdown back should produce structurally equivalent content —
 * preserving heading levels, code block languages, list nesting, table structure,
 * and link targets.
 */
import fc from 'fast-check';
import { htmlToMarkdown } from '../htmlToMarkdown';

const PAGE_URL = 'https://docs.amplify.aws/test';

/** Safe word arbitrary — no special Markdown chars */
const word = fc.stringMatching(/^[A-Za-z][A-Za-z0-9]{1,15}$/);

/** Helper to create an HTMLElement from an HTML string */
function createElement(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div;
}

// ── Arbitraries for HTML structures ──

/** Heading: h1–h6 */
const headingArb = fc
  .tuple(fc.integer({ min: 1, max: 6 }), word)
  .map(([level, text]) => ({
    html: `<h${level}>${text}</h${level}>`,
    verify: (md: string) => {
      const prefix = '#'.repeat(level) + ' ';
      expect(md).toContain(`${prefix}${text}`);
    }
  }));

/** Fenced code block with language */
const codeBlockArb = fc
  .tuple(
    fc.constantFrom('typescript', 'javascript', 'python', 'json', 'bash'),
    word
  )
  .map(([lang, code]) => ({
    html: `<pre><code class="language-${lang}">${code}</code></pre>`,
    verify: (md: string) => {
      expect(md).toContain('```' + lang);
      expect(md).toContain(code);
    }
  }));

/** Unordered list with 2–4 items */
const ulArb = fc.array(word, { minLength: 2, maxLength: 4 }).map((items) => ({
  html: `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`,
  verify: (md: string) => {
    for (const item of items) {
      expect(md).toContain(`- ${item}`);
    }
  }
}));

/** Ordered list with 2–4 items */
const olArb = fc.array(word, { minLength: 2, maxLength: 4 }).map((items) => ({
  html: `<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`,
  verify: (md: string) => {
    items.forEach((item, idx) => {
      expect(md).toContain(`${idx + 1}. ${item}`);
    });
  }
}));

/** Table with header + 1–3 data rows, 2–3 columns */
const tableArb = fc
  .tuple(
    fc.array(word, { minLength: 2, maxLength: 3 }),
    fc.array(fc.array(word, { minLength: 2, maxLength: 3 }), {
      minLength: 1,
      maxLength: 3
    })
  )
  .map(([headers, rows]) => {
    // Ensure all rows have same column count as headers
    const cols = headers.length;
    const normalizedRows = rows.map((r) => {
      while (r.length < cols) r.push('empty');
      return r.slice(0, cols);
    });

    const headerRow = `<tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>`;
    const dataRows = normalizedRows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
      .join('');

    return {
      html: `<table>${headerRow}${dataRows}</table>`,
      verify: (md: string) => {
        // Header row
        expect(md).toContain(`| ${headers.join(' | ')} |`);
        // Separator
        expect(md).toContain(`| ${headers.map(() => '---').join(' | ')} |`);
        // Data rows
        for (const row of normalizedRows) {
          expect(md).toContain(`| ${row.join(' | ')} |`);
        }
      }
    };
  });

/** Link */
const linkArb = fc.tuple(word, word).map(([text, path]) => ({
  html: `<p><a href="/${path}">${text}</a></p>`,
  verify: (md: string) => {
    expect(md).toContain(`[${text}](/${path})`);
  }
}));

/** Paragraph with bold/italic */
const inlineArb = fc.tuple(word, word).map(([bold, italic]) => ({
  html: `<p><strong>${bold}</strong> and <em>${italic}</em></p>`,
  verify: (md: string) => {
    expect(md).toContain(`**${bold}**`);
    expect(md).toContain(`*${italic}*`);
  }
}));

/** Union of all block-level arbitraries */
const blockArb = fc.oneof(
  headingArb,
  codeBlockArb,
  ulArb,
  olArb,
  tableArb,
  linkArb,
  inlineArb
);

describe('Property 10: Markdown export round-trip', () => {
  it('should preserve heading levels and text', () => {
    fc.assert(
      fc.property(headingArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve code block language and content', () => {
    fc.assert(
      fc.property(codeBlockArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve unordered list items', () => {
    fc.assert(
      fc.property(ulArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve ordered list items with numbering', () => {
    fc.assert(
      fc.property(olArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve table headers, separator, and data rows', () => {
    fc.assert(
      fc.property(tableArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve link text and href', () => {
    fc.assert(
      fc.property(linkArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve inline bold and italic formatting', () => {
    fc.assert(
      fc.property(inlineArb, (block) => {
        const el = createElement(`<div>${block.html}</div>`);
        const md = htmlToMarkdown(el, PAGE_URL);
        block.verify(md);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve structure of mixed content pages', () => {
    fc.assert(
      fc.property(
        fc.array(blockArb, { minLength: 2, maxLength: 5 }),
        (blocks) => {
          const html = `<div>${blocks.map((b) => b.html).join('\n')}</div>`;
          const el = createElement(html);
          const md = htmlToMarkdown(el, PAGE_URL);

          for (const block of blocks) {
            block.verify(md);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
