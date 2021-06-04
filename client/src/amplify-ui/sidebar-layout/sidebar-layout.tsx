import {Component, Host, State, h} from "@stencil/core";
import {MQTablet} from "../styles/media";
import {sidebarLayoutContext} from "./sidebar-layout.context";
import {ToggleInView} from "./sidebar-layout.types";

@Component({tag: "amplify-sidebar-layout", shadow: false})
export class AmplifySidebarLayout {
  // Slice off the "@media " string at the start for use in JS instead of CSS
  readonly MQTabletJS = MQTablet.substring(6);
  // If the media query matches, then the user is on desktop and should see the menu by default
  @State() sidebarInView = window.matchMedia(this.MQTabletJS).matches;

  toggleSidebarInView: ToggleInView = () =>
    (this.sidebarInView = !this.sidebarInView);

  render() {
    return (
      <Host>
        <sidebarLayoutContext.Provider
          state={{
            inView: this.sidebarInView,
            toggleInView: this.toggleSidebarInView,
          }}
        >
          <slot />
        </sidebarLayoutContext.Provider>
      </Host>
    );
  }
}
