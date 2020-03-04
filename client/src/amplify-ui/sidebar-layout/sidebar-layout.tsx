import {Component, Host, State, h} from "@stencil/core";
import {sidebarLayoutContext} from "./sidebar-layout.context";
import {sidebarLayoutStyle} from "./sidebar-layout.style";
import {ToggleInView} from "./sidebar-layout.types";

@Component({tag: "amplify-sidebar-layout", shadow: false})
export class AmplifySidebarLayout {
  @State() sidebarInView = false;

  toggleSidebarInView: ToggleInView = () =>
    (this.sidebarInView = !this.sidebarInView);

  render() {
    return (
      <Host>
        <div class={sidebarLayoutStyle}>
          <sidebarLayoutContext.Provider
            state={{
              inView: this.sidebarInView,
              toggleInView: this.toggleSidebarInView,
            }}
          >
            <slot name="sidebar" />
            <slot name="main" />
            <slot name="toc" />
          </sidebarLayoutContext.Provider>
        </div>
      </Host>
    );
  }
}
