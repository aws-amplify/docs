import {Component, Host, Listen, Prop, h} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {sidebarLayoutSidebarStyle} from "./sidebar-layout-sidebar.style";
import {ToggleInView} from "../sidebar-layout.types";

@Component({tag: "amplify-sidebar-layout-sidebar", shadow: false})
export class AmplifySidebarLayoutSidebar {
  /*** is the sidebar hidden? This prop is passed via `sidebar-context` */
  @Prop() readonly inView?: boolean;
  /*** at what distance from the viewport top should the bar be affixed? */
  @Prop() readonly top?: number;
  /*** toggles the state provided by `sidebar-layout` */
  @Prop() readonly toggleInView?: ToggleInView;

  ref?: HTMLElement | null;
  setRef = (ref: HTMLElement | null) => (this.ref = ref);

  // @ts-ignore
  @Listen("mousedown", {target: "window"})
  // @ts-ignore
  @Listen("touchstart", {target: "window"})
  clickListener(e: Event) {
    if (this.inView) {
      const clickedElement = e.target as HTMLElement | undefined;
      if (this.ref && clickedElement && !this.ref.contains(clickedElement)) {
        this.toggleInView && this.toggleInView();
      }
    }
  }

  render() {
    return (
      <Host
        ref={this.setRef}
        class={{
          "in-view": this.inView === undefined || this.inView,
          [sidebarLayoutSidebarStyle]: true,
        }}
      >
        <div>
          <div
            style={{
              top:
                this.top === undefined ? "initial" : `${String(this.top)}rem`,
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarLayoutSidebar, [
  "inView",
  "toggleInView",
]);
