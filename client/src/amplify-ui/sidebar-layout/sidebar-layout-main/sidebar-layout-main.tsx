import {Component, Host, Prop, h} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {sidebarLayoutMainStyle} from "./sidebar-layout-main.style";

@Component({tag: "amplify-sidebar-layout-main", shadow: false})
export class AmplifySidebarLayoutMain {
  /*** whether or not the sidebar is in view, provided by `sidebar-layout` */
  @Prop() readonly inView?: boolean;

  render() {
    return (
      <Host
        class={{
          [sidebarLayoutMainStyle]: true,
          "in-view": this.inView === undefined || this.inView,
        }}
      >
        <div>
          <slot />
        </div>
      </Host>
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarLayoutMain, ["inView"]);
