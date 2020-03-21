import {Component, Host, Prop, h} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {
  sidebarLayoutSidebarToggleStyle,
  unclickableStyle,
} from "./sidebar-layout-toggle.style";
import {ToggleInView} from "../sidebar-layout.types";

@Component({tag: "amplify-sidebar-layout-toggle", shadow: false})
export class AmplifySidebarLayoutToggle {
  /*** toggles the state provided by `sidebar-layout` */
  @Prop() readonly toggleInView?: ToggleInView;
  /*** whether or not the sidebar is in view, provided by `sidebar-layout` */
  @Prop() readonly inView?: boolean;
  /*** when the sidebar is in view, what class should be appended to the button? */
  @Prop() readonly inViewClass?: string;

  /**
   * We always render with the class resulting from `sidebarLayoutSidebarToggleStyle`.
   * Depending on whether the sidebar is in view, we want to attach a class
   * to enable conditional styling of the toggle. The toggle user can––for instance––
   * conditionally hide different icons depending on whether they want to open or close the
   * sidebar (mobile only)
   */
  getClass = () => {
    return {
      [unclickableStyle]: !!this.inView,
      [sidebarLayoutSidebarToggleStyle]: true,
      ...(this.inViewClass ? {[this.inViewClass]: !!this.inView} : {}),
    };
  };

  render() {
    return (
      <Host onClick={this.toggleInView} class={this.getClass()}>
        <slot />
      </Host>
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarLayoutToggle, [
  "inView",
  "toggleInView",
]);
