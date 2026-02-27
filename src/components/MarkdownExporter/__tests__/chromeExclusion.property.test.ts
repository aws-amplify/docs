/**
 * @jest-environment jsdom
 *
 * Feature: amplify-docs-restructuring, Property 13: Markdown export excludes site chrome
 *
 * For any rendered page HTML, the htmlToMarkdown function should produce output
 * that does not contain elements with navigation, feedback, copy-button, or
 * site-chrome CSS classes/selectors.
 */
import fc from 'fast-check';
import { htmlToMarkdown, STRIP_SELECTORS } from '../htmlToMarkdown';

/** Chrome element definitions: tag/class combos that must be stripped */
const chromeElements: Array<{ tag: string; attr: string; label: string }> = [
  { tag: 'nav', attr: '', label: 'navigation' },
  { tag: 'div', attr: 'class="breadcrumb__nav"', label: 'breadcrumb' },
  { tag: 'div', attr: 'class="feedback-section"', label: 'feedback' },
  { tag: 'div', attr: 'class="vote-button"', label: 'vote-button' },
  {
    tag: 'div',
    attr: 'class="vote-buttons-container"',
    label: 'vote-buttons-container'
  },
  { tag: 'div', attr: 'class="vote-response"', label: 'vote-response' },
  { tag: 'div', attr: 'class="copy-code"', label: 'copy-code' },
  { tag: 'footer', attr: '', label: 'footer-element' },
  {
    tag: 'div',
    attr: 'class="layout-sidebar-left"',
    label: 'layout-sidebar'
  },
  {
    tag: 'div',
    attr: 'class="table-of-contents"',
    label: 'table-of-contents'
  },
  {
    tag: 'div',
    attr: 'class="next-previous-links"',
    label: 'next-previous'
  },
  { tag: 'div', attr: 'class="banner-top"', label: 'banner-top' },
  { tag: 'div', attr: 'class="eol-banner-msg"', label: 'eol-banner' },
  {
    tag: 'div',
    attr: 'class="skip-to-main-link"',
    label: 'skip-to-main'
  },
  {
    tag: 'div',
    attr: 'class="page-last-updated-info"',
    label: 'page-last-updated'
  }
];

/** Arbitrary for a chrome element (one that should be stripped) */
const chromeElement = fc.constantFrom(...chromeElements).map((def) => {
  const attrStr = def.attr ? ` ${def.attr}` : '';
  return {
    html: `<${def.tag}${attrStr}>CHROME_${def.label}</${def.tag}>`,
    label: def.label
  };
});

/** Arbitrary for content text — no trailing/leading spaces to avoid trim mismatches */
const contentWord = fc.stringMatching(/^[A-Za-z][A-Za-z0-9]{2,20}$/);

/** Helper to create an HTMLElement from an HTML string */
function createElement(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div;
}

describe('Property 13: Markdown export excludes site chrome', () => {
  it('should strip every chrome element type from output', () => {
    fc.assert(
      fc.property(chromeElement, contentWord, (chrome, content) => {
        const html = `<div>${chrome.html}<p>${content}</p></div>`;
        const el = createElement(html);
        const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');

        // Chrome text must not appear
        expect(md).not.toContain(`CHROME_${chrome.label}`);
        // Real content must survive
        expect(md).toContain(content);
      }),
      { numRuns: 100 }
    );
  });

  it('should strip multiple chrome elements simultaneously', () => {
    fc.assert(
      fc.property(
        fc.array(chromeElement, { minLength: 2, maxLength: 6 }),
        contentWord,
        (chromes, content) => {
          const chromeHtml = chromes.map((c) => c.html).join('\n');
          const html = `<div>${chromeHtml}<h1>${content}</h1></div>`;
          const el = createElement(html);
          const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');

          for (const chrome of chromes) {
            expect(md).not.toContain(`CHROME_${chrome.label}`);
          }
          expect(md).toContain(content);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should preserve all content paragraphs while stripping chrome', () => {
    fc.assert(
      fc.property(
        fc.array(contentWord, { minLength: 1, maxLength: 4 }),
        chromeElement,
        (words, chrome) => {
          const paragraphs = words.map((w) => `<p>${w}</p>`);
          const html = `<div>${chrome.html}${paragraphs.join('\n')}</div>`;
          const el = createElement(html);
          const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');

          expect(md).not.toContain(`CHROME_${chrome.label}`);
          for (const word of words) {
            expect(md).toContain(word);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should not strip content that merely contains a strip-selector keyword', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'Learn about navigation patterns',
          'User feedback is important',
          'Copy this code snippet',
          'The footer section explains more'
        ),
        (text) => {
          const html = `<div><p>${text}</p></div>`;
          const el = createElement(html);
          const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');

          expect(md).toContain(text);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should strip chrome even when deeply nested inside content', () => {
    fc.assert(
      fc.property(chromeElement, contentWord, (chrome, content) => {
        const html = `
          <div>
            <section>
              <article>
                <p>${content}</p>
                ${chrome.html}
              </article>
            </section>
          </div>`;
        const el = createElement(html);
        const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');

        expect(md).not.toContain(`CHROME_${chrome.label}`);
        expect(md).toContain(content);
      }),
      { numRuns: 100 }
    );
  });
});
