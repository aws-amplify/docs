import styled from "@emotion/styled";

type CodeBlockProps = {
  oneLine: boolean;
};

export const CodeBlockStyle = styled.div<CodeBlockProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: var(--code-bg-color);
  overflow-x: auto;
  border-radius: 0.25rem;
  padding: 1rem 0;
  width: 100%;
  color: var(--code-font-color);

  .highlight {
    padding: 0 1rem 0 0;
    overflow: auto;
  }

  padding-left: ${(props) => (props.oneLine ? "1rem" : "0")};
`;

export const LineCountStyle = styled.div`
  position: sticky;
  left: 0;
  background-color: var(--code-bg-color);
  color: var(--code-line-numbers-color);
  text-align: center;
  padding: 0 1rem;
  user-select: none;
  opacity: 0.8;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const CopyButtonStyle = styled.button`
  position: sticky;
  height: 1rem;
  top: 0.25rem;
  right: 0.5rem;
  opacity: 0.75;
  background-color: transparent;
  appearance: none;

  span {
    position: relative;
    top: -1rem;
    color: var(--color-white);
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
  }
`;

// theming taken from https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vsc-dark-plus.css
export const CodeHighlightStyle = styled.div`
  display: flex;
  flex: 1;

  pre[class*="language-"],
  code[class*="language-"] {
    color: #d4d4d4;
    font-size: 0.8125rem;
    text-shadow: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  pre[class*="language-"]::selection,
  code[class*="language-"]::selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  @media print {
    pre[class*="language-"],
    code[class*="language-"] {
      text-shadow: none;
    }
  }

  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    background: #1e1e1e;
  }

  :not(pre) > code[class*="language-"] {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    color: #db4c69;
    background: #f9f2f4;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6a9955;
  }

  .token.punctuation {
    color: #d4d4d4;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #ce9178;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #b5cea8;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #d4d4d4;
    background: #1e1e1e;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #c586c0;
  }

  .token.function {
    color: #dcdcaa;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #d16969;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.constant {
    color: #9cdcfe;
  }

  .token.class-name {
    color: #4ec9b0;
  }

  .token.parameter {
    color: #9cdcfe;
  }

  .token.interpolation {
    color: #9cdcfe;
  }

  .token.punctuation.interpolation-punctuation {
    color: #569cd6;
  }

  .token.boolean {
    color: #569cd6;
  }

  .token.property {
    color: #9cdcfe;
  }

  .token.selector {
    color: #d7ba7d;
  }

  .token.tag {
    color: #569cd6;
  }

  .token.attr-name {
    color: #9cdcfe;
  }

  .token.attr-value {
    color: #ce9178;
  }

  .token.entity {
    color: #4ec9b0;
    cursor: unset;
  }

  .token.namespace {
    color: #4ec9b0;
  }

  pre[class*="language-javascript"],
  code[class*="language-javascript"] {
    color: #4ec9b0;
  }

  pre[class*="language-css"],
  code[class*="language-css"] {
    color: #ce9178;
  }

  pre[class*="language-html"],
  code[class*="language-html"] {
    color: #d4d4d4;
  }

  .language-html .token.punctuation {
    color: #808080;
  }

  pre[data-line] {
    position: relative;
  }

  pre[class*="language-"] > code[class*="language-"] {
    position: relative;
    z-index: 1;
  }

  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em;
    background: #f7ebc6;
    box-shadow: inset 0.3125rem 0 0 #f7d87c;
    z-index: 0;
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }
`;
