import {Component, h, Host} from "@stencil/core";
import {
  platformsGroupStyle,
  platformIcon,
  buttonStyle,
} from "./landing-hero-cta.style";
import * as img from "../../constants/img";

@Component({tag: "docs-landing-hero-cta", shadow: false})
export class DocsLandingHeroCTA {
  render() {
    return (
      <Host>
        <docs-internal-link-button class={buttonStyle} href="/start">
          <span slot="text">Get Started</span>
        </docs-internal-link-button>
        <div class={platformsGroupStyle}>
          <docs-internal-link
            href="/start/q/integration/js"
            class="scale-up-on-hover"
          >
            <img class={platformIcon} {...img.JS} />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/ios"
            class="scale-up-on-hover"
          >
            <img class={platformIcon} {...img.IOS} />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/android"
            class="scale-up-on-hover"
          >
            <img class={platformIcon} {...img.ANDROID} />
          </docs-internal-link>
        </div>
      </Host>
    );
  }
}
