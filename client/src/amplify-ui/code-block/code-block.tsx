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

@Component({tag: "amplify-code-block", shadow: false})
export class AmplifyCodeBlock {
  /**
   * the number of lines of the code block
   */
  @Prop() readonly lineCount?: string;
  @Prop() readonly language?: string;
  @State() parsedLineCount?: number;
  @State() copyMessage: typeof COPY | typeof COPIED | typeof FAILED = "copy";
  element?: HTMLDivElement;

  componentWillLoad() {
    const parsed = this.lineCount && parseInt(this.lineCount);
    if (parsed && parsed > 1) this.parsedLineCount = parsed;
  }

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
    return (
      <Host
        class={{
          [codeBlockStyle]: true,
          [oneLineStyle]: this.parsedLineCount === undefined,
        }}
      >
        {this.parsedLineCount && (
          <div class={lineCountStyle}>
            <div>
              {this.lineCount &&
                new Array(this.parsedLineCount)
                  .fill(null)
                  .map((_, i) => <span>{String(i + 1)}</span>)}
            </div>
          </div>
        )}
        <div ref={this.setElement} class={slotContainerStyle}>
          <slot />
        </div>
        {this.copyButton()}
      </Host>
    );
  }
}
