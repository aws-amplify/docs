import {Component, h, Prop, Host} from "@stencil/core";
import {activeSwitchStyle, switchStyle} from "./version-switch.style";
import {SwitchOption} from "./version-switch.types";

@Component({tag: "docs-version-switch", shadow: false})
export class DocsVersionSwitch {
  /*** Switcher option appearing to the left ***/
  @Prop() readonly leftOption: SwitchOption;
  /*** Switcher option appearing to the right ***/
  @Prop() readonly rightOption: SwitchOption;

  render() {
    if (this.leftOption && this.rightOption) {
      return (
        <Host class={switchStyle}>
          <docs-internal-link
            href={this.leftOption.href}
            childActiveClass={activeSwitchStyle}
          >
            <span>{this.leftOption.title}</span>
            <span class="subtitle">{this.leftOption.subTitle}</span>
          </docs-internal-link>
          <docs-internal-link
            href={this.rightOption.href}
            childActiveClass={activeSwitchStyle}
          >
            <span>{this.rightOption.title}</span>
            <span class="subtitle">{this.rightOption.subTitle}</span>
          </docs-internal-link>
        </Host>
      );
    }
  }
}
