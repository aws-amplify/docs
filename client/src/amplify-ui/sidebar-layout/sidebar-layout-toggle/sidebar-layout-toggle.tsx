import {Component, Host, Prop, h} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {sidebarLayoutSidebarToggleStyle} from "./sidebar-layout-toggle.style";
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
    return (
      sidebarLayoutSidebarToggleStyle +
      (this.inViewClass && this.inView ? " " + this.inViewClass : "")
    );
  };

  /**
   * Ensures that we don't trigger the toggle if `this.inView` is truthy.
   * This prevents accidental dual-toggling (which is equivalent to no toggling).
   */
  safeToggle = (e: Event) => {
    if (this.inView) {
      e.stopPropagation();
    }
    if (this.toggleInView) {
      this.toggleInView();
    }
  };

  render() {
    return (
      <Host onClick={this.safeToggle} class={this.getClass()}>
        <slot />
      </Host>
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarLayoutToggle, [
  "inView",
  "toggleInView",
]);
