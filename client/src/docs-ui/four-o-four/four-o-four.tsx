import {Component, h, Host} from "@stencil/core";
import {hostStyle} from "./four-o-four.style";

@Component({tag: "docs-four-o-four", shadow: false})
export class DocsFourOFour {
  render() {
    return (
      <Host class={hostStyle}>
        <div>
          <h1>404</h1>
          <p>
            {`Apologies––we can't seem to find the page for which you're looking. If this is a mistake, please `}
            <amplify-external-link
              href={`https://github.com/aws-amplify/docs/issues/new?title=[missing-page]&labels=v2&body=${encodeURI(
                `**Page**: [\`${location.href}\`](${location.href})

**Feedback**: <!-- your feedback here -->
`,
              )}`}
            >
              file an issue
            </amplify-external-link>
            {` and we'll fix it ASAP.`}
          </p>
          <docs-internal-link-button href="/">
            Return to the landing page
          </docs-internal-link-button>
        </div>
      </Host>
    );
  }
}
