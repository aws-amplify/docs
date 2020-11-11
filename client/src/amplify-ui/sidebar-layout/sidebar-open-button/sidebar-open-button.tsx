import {Component, Prop, h, Host, State} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {ToggleInView} from "../sidebar-layout.types";
import {sidebarOpenButtonStyle} from "./sidebar-open-button.style";
import {DESKTOP_OPEN} from "../../../constants/img";

@Component({tag: "amplify-sidebar-open-button"})
export class AmplifySidebarOpenButton {
  /*** toggles the state provided by `sidebar-layout` */
  @Prop() readonly toggleInView?: ToggleInView;
  /*** whether or not the sidebar is in view, provided by `sidebar-layout` */
  @Prop() readonly inView?: boolean;
  /*** whether or not the button is being hovered */
  @State() isHovered = false;

  onClick = (e: Event) => {
    if (this.inView) {
      e.stopPropagation();
    } else {
      // if we don't do this, the open icon is dark when the user closes the menu even if they are not hovering over it
      this.isHovered = false;
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
      ? DESKTOP_OPEN.darkSrc
      : DESKTOP_OPEN.lightSrc;
    return (
      !this.inView && (
        <Host>
          <button
            class={sidebarOpenButtonStyle}
            onClick={this.onClick}
            onMouseEnter={this.hover}
            onMouseLeave={this.unhover}
          >
            <img alt={DESKTOP_OPEN.alt} src={imgLink} />
          </button>
        </Host>
      )
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarOpenButton, [
  "inView",
  "toggleInView",
]);
