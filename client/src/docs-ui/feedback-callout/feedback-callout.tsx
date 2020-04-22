import {Component, h, Host, State} from "@stencil/core";
import {
  hostStyle,
  displayStyle,
  arrowStyle,
  arrowUpStyle,
  exStyle,
  calloutTextStyle,
} from "./feedback-callout.style";

const IS_DISMISSED_LOCAL_STORAGE_KEY =
  "amplify-docs::feedback-request-dismissed";

@Component({tag: "docs-feedback-callout", shadow: false})
export class DocsFeedbackCallout {
  @State() dismissed = true;

  componentWillLoad() {
    this.dismissed = !!localStorage.getItem(IS_DISMISSED_LOCAL_STORAGE_KEY);
  }

  dismiss = () => {
    this.dismissed = true;
    localStorage.setItem(IS_DISMISSED_LOCAL_STORAGE_KEY, "true");
  };

  render() {
    return (
      <Host class={{[hostStyle]: true, [displayStyle]: !this.dismissed}}>
        <amplify-external-link
          href={`https://github.com/aws-amplify/docs/issues/new?title=[feedback]&labels=v2&body=${encodeURI(
            `**Page**: [\`${location.href}\`](${location.href})

**Feedback**: <!-- your feedback here -->
`,
          )}`}
        >
          <span class={calloutTextStyle}>
            <i
              class={{
                [arrowStyle]: true,
                [arrowUpStyle]: true,
              }}
            ></i>
            <span class="text">{`We'd love your feedback`}</span>
          </span>
        </amplify-external-link>
        <button class={exStyle} onClick={this.dismiss}>
          <img src="/assets/close.svg" />
        </button>
      </Host>
    );
  }
}
