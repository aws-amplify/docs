import {Component, Host, h} from "@stencil/core";
import {css} from "emotion";

const tocStoryStyle = css`
  display: flex;
  flex-direction: row;

  #toc > div {
    position: sticky;
    top: 0;
  }
`;

@Component({tag: "amplify-toc-story", shadow: false})
export class AmplifyTocStory {
  render() {
    return (
      <Host>
        <amplify-toc-provider class={tocStoryStyle}>
          <amplify-toc-contents>
            <amplify-lorem />
          </amplify-toc-contents>
          <div id="toc">
            <div>
              <amplify-toc />
            </div>
          </div>
        </amplify-toc-provider>
      </Host>
    );
  }
}
