import {
  CodeBlockStyle,
  CodeHighlightStyle,
  CopyButtonStyle,
  LineCountStyle
} from './styles';
import React from 'react';
import copy from 'copy-to-clipboard';

const COPIED = 'copied ✅';
const FAILED = 'failed to copy';
const CONSOLE = 'console';

const COPY = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 2H12V9H11V4C11 3.44772 10.5523 3 10 3H5V2ZM13 11H11V13C11 13.5523 10.5523 14 10 14H1C0.447715 14 0 13.5523 0 13V4C0 3.44772 0.447715 3 1 3H3V1C3 0.447715 3.44772 0 4 0H13C13.5523 0 14 0.447715 14 1V10C14 10.5523 13.5523 11 13 11ZM2 12V5H9V12H2Z"
      fill="#545B64"
    />
  </svg>
);

type CopyMessageType = typeof COPY | typeof COPIED | typeof FAILED;

type CodeBlockProps = {
  lineCount: string;
  lineCountOffset?: number;
  language: string;
  regionalCopy?: boolean; // True to remove copy to clipboard button
  children: React.ReactElement[];
};

type CodeBlockState = {
  copyMessage: CopyMessageType;
};

class CodeBlock extends React.Component<CodeBlockProps, CodeBlockState> {
  element?: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = { copyMessage: COPY };
  }

  lineNumbers = (regionalCopy) => {
    const lineCount = parseInt(this.props.lineCount);
    if (lineCount > 1 && this.props.language !== CONSOLE) {
      return (
        <LineCountStyle regionalCopy={regionalCopy}>
          <div>
            {new Array(lineCount).fill(null).map((_, i) => {
              const lineNumber =
                i + 1 + Number(this.props.lineCountOffset) || 0;
              return <span key={lineNumber}>{lineNumber}</span>;
            })}
          </div>
        </LineCountStyle>
      );
    }
  };

  setElement = (ref: HTMLDivElement | undefined) => {
    if (ref !== null) {
      this.element = ref;
    }
  };

  copyToClipboard = () => {
    if (this.element && this.element.textContent) {
      copy(this.element.textContent);
      this.setState({ copyMessage: COPIED });
    } else {
      this.setState({ copyMessage: FAILED });
    }
    setTimeout(() => {
      this.setState({ copyMessage: COPY });
    }, 1500);
  };

  copyButton = (regionalCopy) => {
    if (this.props.language !== CONSOLE) {
      return (
        <CopyButtonStyle
          onClick={this.copyToClipboard}
          regionalCopy={regionalCopy}
        >
          <span>{this.state.copyMessage}</span>
        </CopyButtonStyle>
      );
    }
  };

  render() {
    if (this.props.children === undefined) return <div></div>;
    const oneLine =
      this.props.lineCount === '1' || this.props.language === CONSOLE;

    const regionalCopy = this.props.lineCountOffset > 1;

    return (
      <CodeBlockStyle
        oneLine={oneLine}
        regionalCopy={regionalCopy}
        onClick={this.copyToClipboard}
      >
        {this.lineNumbers(regionalCopy)}

        <CodeHighlightStyle ref={this.setElement}>
          {this.props.children}
        </CodeHighlightStyle>

        {this.copyButton(regionalCopy)}
      </CodeBlockStyle>
    );
  }
}

export default CodeBlock;
