import {Component, Host, h} from "@stencil/core";
import {css} from "emotion";

const sidebarLayoutStoryStyle = css`
  display: flex;
  flex-direction: column;

  amplify-sidebar-layout-sidebar > div > div > div {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  }
`;

@Component({tag: "amplify-sidebar-layout-story", shadow: false})
export class AmplifySidebarLayoutStory {
  render() {
    return (
      <Host class={sidebarLayoutStoryStyle}>
        <amplify-sidebar-layout>
          <amplify-sidebar-layout-sidebar slot="sidebar" top={0}>
            <div>some content</div>
          </amplify-sidebar-layout-sidebar>
          <amplify-sidebar-layout-main slot="main">
            <amplify-sidebar-layout-toggle in-view-class="in-view">
              toggle
            </amplify-sidebar-layout-toggle>
            <amplify-lorem />
          </amplify-sidebar-layout-main>
        </amplify-sidebar-layout>
      </Host>
    );
  }
}
