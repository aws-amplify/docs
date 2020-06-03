import {Component, h, Host, State, Listen} from "@stencil/core";
import {heroStyle, landingSearchStyle} from "./hero.style";
import {isWiderThanTablet} from "../../amplify-ui/styles/media";

@Component({tag: "docs-hero", shadow: false})
export class DocsHero {
  @State() isWiderThanTablet = this.calculateIsWiderThanTablet();

  @Listen("resize", {target: "window"})
  calculateIsWiderThanTablet() {
    this.isWiderThanTablet = isWiderThanTablet();
    return this.isWiderThanTablet;
  }

  render() {
    return (
      <Host class={heroStyle}>
        <slot name="heading" />
        <slot name="subheading" />
        <slot name="cta" />
        {!this.isWiderThanTablet && (
          <div class={landingSearchStyle}>
            <docs-search-bar />
          </div>
        )}
      </Host>
    );
  }
}
