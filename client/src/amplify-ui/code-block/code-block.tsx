import {Component, Host, h, Prop, State} from "@stencil/core";
import {
  codeBlockStyle,
  lineCountStyle,
  noLineNumbersStyle,
  copyButtonStyle,
  slotContainerStyle,
} from "./code-block.style";
import copy from "copy-to-clipboard";

const COPY = "copy";
const COPIED = "copied";
const FAILED = "failed to copy";
const CONSOLE = "console";

let alwaysRecompute = 0;

@Component({tag: "amplify-code-block", shadow: false})
export class AmplifyCodeBlock {
  /** the number of lines of the code block */
  @Prop() readonly lineCount: number;
  /** what language are we displaying */
  @Prop() readonly language: string;

  @State() copyMessage: typeof COPY | typeof COPIED | typeof FAILED = "copy";

  element?: HTMLDivElement;

  setElement = (ref: HTMLDivElement | undefined) => {
    if (ref !== null) {
      this.element = ref;
    }
  };

  copyToClipboard = () => {
    if (this.element && this.element.textContent) {
      copy(this.element.textContent);
      this.copyMessage = COPIED;
    } else {
      this.copyMessage = FAILED;
    }
    setTimeout(() => {
      this.copyMessage = COPY;
    }, 1500);
  };

  copyButton = () => {
    if (this.language !== CONSOLE) {
      return (
        <button class={copyButtonStyle} onClick={this.copyToClipboard}>
          <span>{this.copyMessage}</span>
        </button>
      );
    }
  };

  lineNumbers = () => {
    if (this.lineCount > 1 && this.language !== CONSOLE) {
      return (
        <div class={lineCountStyle}>
          <div>
            {new Array(this.lineCount).fill(null).map((_, i) => (
              <span>{String(i + 1)}</span>
            ))}
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <Host
        class={{
          [codeBlockStyle]: true,
          [noLineNumbersStyle]:
            this.lineCount === 1 || this.language === CONSOLE,
        }}
      >
        {this.lineNumbers()}
        <div
          key={String(alwaysRecompute++)}
          ref={this.setElement}
          class={slotContainerStyle}
        >
          <slot name="content" />
        </div>
        {this.copyButton()}
      </Host>
    );
  }
}
