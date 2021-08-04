import {
  CodeBlockStyle,
  CodeHighlightStyle,
  CopyButtonStyle,
  LineCountStyle,
} from "./styles";
import React from "react";
import copy from "copy-to-clipboard";

const COPY = "copy";
const COPIED = "copied";
const FAILED = "failed to copy";
const CONSOLE = "console";

type CopyMessageType = typeof COPY | typeof COPIED | typeof FAILED;

type CodeBlockProps = {
  lineCount: string;
  language: string;
  children: React.ReactElement[];
};

type CodeBlockState = {
  copyMessage: CopyMessageType;
};

class CodeBlock extends React.Component<CodeBlockProps, CodeBlockState> {
  element?: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {copyMessage: COPY};
  }

  lineNumbers = () => {
    const lineCount = parseInt(this.props.lineCount);
    if (lineCount > 1 && this.props.language !== CONSOLE) {
      return (
        <LineCountStyle>
          <div>
            {new Array(lineCount).fill(null).map((_, i) => (
              <span key={String(i + 1)}>{String(i + 1)}</span>
            ))}
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
      this.setState({copyMessage: COPIED});
    } else {
      this.setState({copyMessage: FAILED});
    }
    setTimeout(() => {
      this.setState({copyMessage: COPY});
    }, 1500);
  };

  copyButton = () => {
    if (this.props.language !== CONSOLE) {
      return (
        <CopyButtonStyle onClick={this.copyToClipboard}>
          <span>{this.state.copyMessage}</span>
        </CopyButtonStyle>
      );
    }
  };

  render() {
    if (this.props.children === undefined) return <div></div>;
    const oneLine =
      this.props.lineCount === "1" || this.props.language === CONSOLE;

    return (
      <CodeBlockStyle oneLine={oneLine}>
        {this.lineNumbers()}
        <CodeHighlightStyle ref={this.setElement}>
          {this.props.children}
        </CodeHighlightStyle>
        {this.copyButton()}
      </CodeBlockStyle>
    );
  }
}

export default CodeBlock;
