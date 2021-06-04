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
        <docs-internal-link-button
          class={buttonStyle}
          href="/start"
          QSPs="?sc_icampaign=start&sc_ichannel=docs-home"
        >
          <span slot="text">Get started for free</span>
        </docs-internal-link-button>
        <div class={platformsGroupStyle}>
          <docs-internal-link
            href="/start/q/integration/react"
            QSPs="?sc_icampaign=react-start&sc_ichannel=docs-home"
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
            QSPs="?sc_icampaign=vue-start&sc_ichannel=docs-home"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/vue.svg"
              alt="Vue Icon"
            />
          </docs-internal-link>
          <docs-internal-link
            href="/start"
            QSPs="?sc_icampaign=js-start&sc_ichannel=docs-home"
            class="scale-up-on-hover"
          >
            <img
              class={platformIcon}
              src="/assets/integrations/js.svg"
              alt="JS Icon"
            />
          </docs-internal-link>
          <docs-internal-link
            href="/start/q/integration/ios"
            QSPs="?sc_icampaign=ios-start&sc_ichannel=docs-home"
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
            QSPs="?sc_icampaign=android-start&sc_ichannel=docs-home"
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
            QSPs="?sc_icampaign=flutter-start&sc_ichannel=docs-home"
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
