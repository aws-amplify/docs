import type { Token } from 'prism-react-renderer';
import type { TokenListProps } from './types';

export const TokenList = ({
  tokens,
  showLineNumbers,
  getLineProps,
  getTokenProps
}: TokenListProps) => {
  let lineNumber = 0;
  let shouldHighlight = false;
  let highlightNextIndex: number | undefined;

  return tokens.map((line: Token[], i: number) => {
    let showLine = true;
    lineNumber++;

    const isHighlightStart = line.some((token) =>
      token.content.replace(' ', '').includes('//highlight-start')
    );
    const isHighlightEnd = line.some((token) =>
      token.content.replace(' ', '').includes('//highlight-end')
    );
    const isHighlightNext = line.some((token) =>
      token.content.replace(' ', '').includes('//highlight-next-line')
    );

    if (highlightNextIndex && i === highlightNextIndex) {
      shouldHighlight = true;
    }

    if (highlightNextIndex && i === highlightNextIndex + 1) {
      shouldHighlight = false;
      highlightNextIndex = undefined;
    }

    if (isHighlightStart) {
      showLine = false;
      shouldHighlight = true;
      lineNumber--;
    }

    if (isHighlightEnd) {
      showLine = false;
      shouldHighlight = false;
      lineNumber--;
    }

    if (isHighlightNext) {
      showLine = false;
      highlightNextIndex = i + 1;
      lineNumber--;
    }

    return showLine ? (
      <div
        key={i}
        {...getLineProps({ line })}
        className={`token-line${shouldHighlight ? ' line-highlight' : ''}`}
      >
        {showLineNumbers && <span className="line-number">{lineNumber}</span>}
        {line.map((token, key) => (
          <span key={key} {...getTokenProps({ token })} />
        ))}
      </div>
    ) : null;
  });
};
