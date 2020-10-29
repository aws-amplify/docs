import {Component, h, Host} from "@stencil/core";
import {
  platformsGroupStyle,
  platformIcon,
  buttonStyle,
} from "./landing-hero-cta.style";

@Component({tag: "docs-landing-hero-cta", shadow: false})
export class DocsLandingHeroCTA {
  render() {
    return (
      <Host>
        <docs-internal-link-button class={buttonStyle} href="/start">
          <span slot="text">Get started for free</span>
        </docs-internal-link-button>
        <div class={platformsGroupStyle}>
          <docs-internal-link
            href="/start/q/integration/react"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/react.svg"
              alt="React Icon"
            />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/vue"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/vue.svg"
              alt="Vue Icon"
            />
          </docs-internal-link>
          <docs-internal-link href="/start/" class="scale-up-on-hover">
            <img
              class={platformIcon}
              src="/assets/integrations/js.svg"
              alt="JS Icon"
            />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/ios"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/ios.svg"
              alt="iOS Icon"
            />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/android"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/android.svg"
              alt="Android Icon"
            />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/flutter"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/flutter.svg"
              alt="Flutter Icon"
            />
          </docs-internal-link>
        </div>
      </Host>
    );
  }
}
