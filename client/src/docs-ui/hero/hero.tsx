import {Component, h, Host} from "@stencil/core";
import {heroStyle, landingSearchStyle} from "./hero.style";

@Component({tag: "docs-hero", shadow: false})
export class DocsHero {
  render() {
    return (
      <Host class={heroStyle}>
        <slot name="heading" />
        <slot name="subheading" />
        <slot name="cta" />
        <div class={landingSearchStyle}>
          <docs-search-bar />
        </div>
      </Host>
    );
  }
}
