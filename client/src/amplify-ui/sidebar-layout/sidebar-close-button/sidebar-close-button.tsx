import {Component, Prop, h, Host, State} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {ToggleInView} from "../sidebar-layout.types";
import {sidebarCloseButtonStyle} from "./sidebar-close-button.style";
import {DESKTOP_CLOSE} from "../../../constants/img";

@Component({tag: "amplify-sidebar-close-button"})
export class AmplifySidebarCloseButton {
  /*** toggles the state provided by `sidebar-layout` */
  @Prop() readonly toggleInView?: ToggleInView;
  /*** whether or not the sidebar is in view, provided by `sidebar-layout` */
  @Prop() readonly inView?: boolean;
  /*** whether or not the button is being hovered */
  @State() isHovered = false;

  onClick = (e: Event) => {
    if (this.inView) {
      e.stopPropagation();
    }
    if (this.toggleInView) {
      this.toggleInView();
    }
  };

  hover = () => {
    this.isHovered = true;
  };

  unhover = () => {
    this.isHovered = false;
  };

  render() {
    const imgLink = this.isHovered
      ? DESKTOP_CLOSE.darkSrc
      : DESKTOP_CLOSE.lightSrc;
    return (
      <Host>
        <button
          class={sidebarCloseButtonStyle}
          onClick={this.onClick}
          onMouseEnter={this.hover}
          onMouseLeave={this.unhover}
        >
          <img alt={DESKTOP_CLOSE.alt} src={imgLink} />
        </button>
      </Host>
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarCloseButton, [
  "inView",
  "toggleInView",
]);
