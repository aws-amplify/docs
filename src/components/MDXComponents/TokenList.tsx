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

    // Test each line to see if it contains highlight comments. We
    // have to build each token in the line array into a string because
    // some languages (like graphQl) split comment text into different tokens.
    const textLine = line
      .map((token) => token.content)
      .join('')
      .replace(/\s/g, '');

    // Test if the line contains code comment for highlight-start
    const isHighlightStart = textLine === '//highlight-start';

    // Test if the line contains code comment for highlight-end
    const isHighlightEnd = textLine === '//highlight-end';

    // Test if the line contains code comment for highlight-next-line
    const isHighlightNext = textLine === '//highlight-next-line';

    // If hilightNextIndex was set previously in the loop,
    // then turn on highlight for this line
    if (highlightNextIndex && i === highlightNextIndex) {
      shouldHighlight = true;
    }

    // If highlightNextIndex was set previously in the loop, and this
    // is the immediate next line, turn off line highlighting and unset
    // highlightNextIndex
    if (highlightNextIndex && i === highlightNextIndex + 1) {
      shouldHighlight = false;
      highlightNextIndex = undefined;
    }

    // If this line is highlight-start don't show this line,
    // turn on line highlight, and decrement lineNumber (since
    // the line is skipped)
    if (isHighlightStart) {
      showLine = false;
      shouldHighlight = true;
      lineNumber--;
    }

    // If this line is highlight-end, don't show this line,
    // turn off line highlight, and decrement lineNumber (since the
    // line is skipped)
    if (isHighlightEnd) {
      showLine = false;
      shouldHighlight = false;
      lineNumber--;
    }

    // If this line is highlight-next-line, don't show the line,
    // set the next index to be highlightable (highlightNextIndex), and
    // decrement lineNumber (since the line is skipped)
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
