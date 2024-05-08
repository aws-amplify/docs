import type { Token } from 'prism-react-renderer';
import type { TokenListProps } from './types';
import { MDXHighlightedCopyCodeButton } from './MDXHighlightedCopyCodeButton';
import classNames from 'classnames';

type ProcessedToken = {
  line: Token[];
  showLine: boolean;
  lineNumber: number;
};

type TokenGroup =
  | (ProcessedToken & {
      type: 'regular';
    })
  | {
      tokens: ProcessedToken[];
      type: 'highlighted';
    };

export const TokenList = ({
  tokens,
  showLineNumbers,
  getLineProps,
  getTokenProps
}: TokenListProps) => {
  let lineNumber = 0;
  let shouldHighlight = false;
  let highlightNextIndex: number | undefined;

  const tokenGroups: TokenGroup[] = [];

  tokens.forEach((line: Token[], i: number) => {
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

    // If highlightNextIndex was set previously in the loop,
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

      tokenGroups.push({
        tokens: [],
        type: 'highlighted'
      });
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

    if (!shouldHighlight) {
      tokenGroups.push({
        type: 'regular',
        line,
        showLine,
        lineNumber
      });
    } else {
      const lastGroup = tokenGroups[tokenGroups.length - 1];
      let existingTokens: ProcessedToken[] = [];
      if (lastGroup?.type === 'highlighted') {
        existingTokens = lastGroup.tokens;
      }
      tokenGroups[tokenGroups.length - 1] = {
        tokens: [
          ...existingTokens,
          {
            lineNumber,
            line,
            showLine
          }
        ],
        type: 'highlighted'
      };
    }
  });

  function renderProcessedToken(
    token: ProcessedToken,
    key: string,
    shouldHighlight: boolean,
    showLineNumbers: boolean = true
  ) {
    return token.showLine ? (
      <div
        key={key}
        {...getLineProps({ line: token.line })}
        className={`token-line${shouldHighlight ? ' line-highlight' : ''}`}
      >
        <div className={classNames({ 'show-line-numbers': showLineNumbers })}>
          {token.line.map((token, key) => (
            <span key={key} {...getTokenProps({ token })} />
          ))}
        </div>
      </div>
    ) : null;
  }

  return tokenGroups.map((processedToken, i) => {
    if (processedToken.type === 'regular') {
      return renderProcessedToken(
        processedToken,
        `regular:${i}`,
        false,
        showLineNumbers
      );
    } else {
      const highlightedCodeString = processedToken.tokens
        .map((token) => token.line.map((line) => line.content).join(''))
        .join('\n');

      return (
        <MDXHighlightedCopyCodeButton
          codeId={`highlighted:${i}`}
          key={`highlighted:${i}`}
          codeString={highlightedCodeString}
        >
          {processedToken.tokens.map((token, j) => {
            return renderProcessedToken(
              token,
              `highlighted:${i}:${j}`,
              true,
              showLineNumbers
            );
          })}
        </MDXHighlightedCopyCodeButton>
      );
    }
  });
};
