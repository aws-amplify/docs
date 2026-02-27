/**
 * @jest-environment jsdom
 */
import {
  htmlToMarkdown,
  STRIP_SELECTORS,
  stripElements,
  convertInlineContent,
  convertTable,
  convertList
} from '../htmlToMarkdown';

/** Helper to create an HTMLElement from an HTML string */
function createElement(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div;
}

describe('htmlToMarkdown', () => {
  describe('headings', () => {
    it('should convert h1-h6 to Markdown headings', () => {
      const el = createElement(`
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <h3>Section</h3>
        <h4>Subsection</h4>
        <h5>Minor</h5>
        <h6>Smallest</h6>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('# Title');
      expect(md).toContain('## Subtitle');
      expect(md).toContain('### Section');
      expect(md).toContain('#### Subsection');
      expect(md).toContain('##### Minor');
      expect(md).toContain('###### Smallest');
    });

    it('should preserve inline formatting in headings', () => {
      const el = createElement(
        '<h2>Using <code>Auth</code> with <strong>React</strong></h2>'
      );
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('## Using `Auth` with **React**');
    });
  });

  describe('code blocks', () => {
    it('should convert pre/code to fenced code blocks', () => {
      const el = createElement(`
        <pre><code class="language-typescript">const x = 1;</code></pre>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('```typescript');
      expect(md).toContain('const x = 1;');
      expect(md).toContain('```');
    });

    it('should handle code blocks wrapped in .code-block container', () => {
      const el = createElement(`
        <div class="code-block">
          <div class="pre-container">
            <div class="pre-header">
              <button>Copy</button>
            </div>
            <div class="pre-wrapper">
              <pre><code class="language-javascript">console.log("hello");</code></pre>
            </div>
          </div>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('```javascript');
      expect(md).toContain('console.log("hello");');
      // Copy button should be stripped
      expect(md).not.toContain('Copy');
    });

    it('should handle code blocks without a language class', () => {
      const el = createElement('<pre><code>plain code</code></pre>');
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('```\nplain code\n```');
    });
  });

  describe('lists', () => {
    it('should convert unordered lists', () => {
      const el = createElement(`
        <ul>
          <li>Item one</li>
          <li>Item two</li>
          <li>Item three</li>
        </ul>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('- Item one');
      expect(md).toContain('- Item two');
      expect(md).toContain('- Item three');
    });

    it('should convert ordered lists', () => {
      const el = createElement(`
        <ol>
          <li>First</li>
          <li>Second</li>
        </ol>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('1. First');
      expect(md).toContain('2. Second');
    });

    it('should handle nested lists', () => {
      const el = createElement(`
        <ul>
          <li>Parent
            <ul>
              <li>Child</li>
            </ul>
          </li>
        </ul>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('- Parent');
      expect(md).toContain('  - Child');
    });
  });

  describe('tables', () => {
    it('should convert tables to Markdown table syntax', () => {
      const el = createElement(`
        <table>
          <tr><th>Name</th><th>Value</th></tr>
          <tr><td>foo</td><td>bar</td></tr>
          <tr><td>baz</td><td>qux</td></tr>
        </table>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('| Name | Value |');
      expect(md).toContain('| --- | --- |');
      expect(md).toContain('| foo | bar |');
      expect(md).toContain('| baz | qux |');
    });
  });

  describe('links', () => {
    it('should convert anchor tags to Markdown links', () => {
      const el = createElement(
        '<p>See <a href="/auth/setup">Auth Setup</a> for details.</p>'
      );
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('[Auth Setup](/auth/setup)');
    });

    it('should preserve external links', () => {
      const el = createElement(
        '<p>Visit <a href="https://github.com">GitHub</a></p>'
      );
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('[GitHub](https://github.com)');
    });
  });

  describe('inline formatting', () => {
    it('should convert bold text', () => {
      const el = createElement('<p>This is <strong>bold</strong> text</p>');
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('**bold**');
    });

    it('should convert italic text', () => {
      const el = createElement('<p>This is <em>italic</em> text</p>');
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('*italic*');
    });

    it('should convert inline code', () => {
      const el = createElement('<p>Use <code>amplify init</code> to start</p>');
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('`amplify init`');
    });
  });

  describe('Callout components', () => {
    it('should convert info callouts to blockquotes', () => {
      const el = createElement(`
        <div class="amplify-message" data-amplify-component="Message">
          <div>
            <div class="amplify-message__icon">
              <span aria-label="Important information"></span>
            </div>
            <div class="amplify-message__content">This is important info.</div>
          </div>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('> ℹ️ **Note**');
      expect(md).toContain('> This is important info.');
    });

    it('should convert warning callouts to blockquotes with warning prefix', () => {
      const el = createElement(`
        <div class="amplify-message amplify-message--warning" data-amplify-component="Message">
          <div>
            <div class="amplify-message__icon">
              <span aria-label="Warning"></span>
            </div>
            <div class="amplify-message__content">Be careful here.</div>
          </div>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).toContain('> ⚠️ **Warning**');
      expect(md).toContain('> Be careful here.');
    });
  });

  describe('chrome stripping', () => {
    it('should strip navigation elements', () => {
      const el = createElement(`
        <div>
          <nav>Navigation links</nav>
          <h1>Page Title</h1>
          <p>Content here.</p>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).not.toContain('Navigation links');
      expect(md).toContain('# Page Title');
      expect(md).toContain('Content here.');
    });

    it('should strip feedback widgets', () => {
      const el = createElement(`
        <div>
          <p>Content</p>
          <div class="feedback">Was this helpful?</div>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).not.toContain('Was this helpful?');
      expect(md).toContain('Content');
    });

    it('should strip breadcrumbs', () => {
      const el = createElement(`
        <div>
          <div class="breadcrumb__container">Home > Auth</div>
          <p>Auth content</p>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).not.toContain('Home > Auth');
      expect(md).toContain('Auth content');
    });

    it('should strip copy buttons from code blocks', () => {
      const el = createElement(`
        <div>
          <div class="code-block">
            <div class="pre-container">
              <div class="pre-header">
                <div class="copy-button">Copy</div>
              </div>
              <pre><code>const x = 1;</code></pre>
            </div>
          </div>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).not.toContain('Copy');
      expect(md).toContain('const x = 1;');
    });

    it('should strip layout sidebar elements', () => {
      const el = createElement(`
        <div>
          <p>Main content</p>
          <div class="layout-sidebar-feedback">Sidebar stuff</div>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/test');
      expect(md).not.toContain('Sidebar stuff');
      expect(md).toContain('Main content');
    });
  });

  describe('does not mutate the original DOM', () => {
    it('should not modify the input element', () => {
      const el = createElement(`
        <div>
          <nav>Nav</nav>
          <p>Content</p>
        </div>
      `);
      const navBefore = el.querySelector('nav');
      expect(navBefore).not.toBeNull();

      htmlToMarkdown(el, 'https://docs.amplify.aws/test');

      const navAfter = el.querySelector('nav');
      expect(navAfter).not.toBeNull();
    });
  });

  describe('mixed content', () => {
    it('should handle a realistic page structure', () => {
      const el = createElement(`
        <div class="main">
          <div class="breadcrumb__container">Home > Auth</div>
          <h1>Authentication</h1>
          <p>Learn how to set up <strong>authentication</strong> with <a href="/auth/setup">Amplify Auth</a>.</p>
          <h2>Prerequisites</h2>
          <ul>
            <li>Node.js 18+</li>
            <li>An AWS account</li>
          </ul>
          <h2>Code Example</h2>
          <div class="code-block">
            <div class="pre-container">
              <div class="pre-header"><button class="copy-button">Copy</button></div>
              <pre><code class="language-typescript">import { Amplify } from 'aws-amplify';</code></pre>
            </div>
          </div>
          <div class="amplify-message" data-amplify-component="Message">
            <div>
              <div class="amplify-message__icon"><span aria-label="Important information"></span></div>
              <div class="amplify-message__content">Make sure to configure Amplify before using Auth.</div>
            </div>
          </div>
          <div class="feedback">Was this helpful?</div>
          <nav>Footer nav</nav>
        </div>
      `);
      const md = htmlToMarkdown(el, 'https://docs.amplify.aws/auth');

      // Should contain content
      expect(md).toContain('# Authentication');
      expect(md).toContain('**authentication**');
      expect(md).toContain('[Amplify Auth](/auth/setup)');
      expect(md).toContain('## Prerequisites');
      expect(md).toContain('- Node.js 18+');
      expect(md).toContain('- An AWS account');
      expect(md).toContain('## Code Example');
      expect(md).toContain('```typescript');
      expect(md).toContain("import { Amplify } from 'aws-amplify';");
      expect(md).toContain('> ℹ️ **Note**');

      // Should NOT contain chrome
      expect(md).not.toContain('Home > Auth');
      expect(md).not.toContain('Was this helpful?');
      expect(md).not.toContain('Footer nav');
      expect(md).not.toContain('Copy');
    });
  });
});
