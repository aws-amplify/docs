import {Component, Host, h, Prop, State} from "@stencil/core";
import {
  codeBlockStyle,
  lineCountStyle,
  oneLineStyle,
  copyButtonStyle,
  slotContainerStyle,
} from "./code-block.style";
import copy from "copy-to-clipboard";

const COPY = "copy";
const COPIED = "copied";
const FAILED = "failed to copy";

let alwaysRecompute = 0;

@Component({tag: "amplify-code-block", shadow: false})
export class AmplifyCodeBlock {
  /** the number of lines of the code block */
  @Prop() readonly lineCount?: string;
  /** what language are we displaying */
  @Prop() readonly language?: string;

  @State() copyMessage: typeof COPY | typeof COPIED | typeof FAILED = "copy";

  element?: HTMLDivElement;

  setElement = (ref: HTMLDivElement | undefined) => (this.element = ref);

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
    if (this.language && this.language === "console") return;

    return (
      <button class={copyButtonStyle} onClick={this.copyToClipboard}>
        <span>{this.copyMessage}</span>
      </button>
    );
  };

  render() {
    const parsed = this.lineCount && parseInt(this.lineCount);
    const parsedLineCount = parsed && parsed > 1 ? parsed : undefined;

    return (
      <Host
        class={{
          [codeBlockStyle]: true,
          [oneLineStyle]: parsedLineCount === undefined,
        }}
      >
        {parsedLineCount && (
          <div class={lineCountStyle}>
            <div>
              {this.lineCount &&
                new Array(parsedLineCount)
                  .fill(null)
                  .map((_, i) => <span>{String(i + 1)}</span>)}
            </div>
          </div>
        )}
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
