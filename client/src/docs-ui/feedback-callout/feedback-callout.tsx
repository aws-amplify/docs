import {Component, h, Host, State} from "@stencil/core";
import {hostStyle, displayStyle} from "./feedback-callout.style";

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
          href={`https://github.com/aws-amplify/docs/issues/new?title=[v2-feedback]&labels=v2&body=${encodeURI(
            `**Page**: [\`${location.href}\`](${location.href})

**Feedback**: <!-- your feedback here -->
`,
          )}`}
        >
          <h4>{`^ We'd love your feedback`}</h4>
        </amplify-external-link>
        <button onClick={this.dismiss}>
          <span>X</span>
        </button>
      </Host>
    );
  }
}
