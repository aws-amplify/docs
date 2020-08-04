import {Component, Host, h} from "@stencil/core";
import {hostStyle} from "./feature-flag.style";
import featureFlagsJson from "./feature-flags.json";
import {FeatureFlags} from "./feature-flag.types";

@Component({tag: "amplify-feature-flags", shadow: false})
export class AmplifyFeatureFlags {
  render() {
    const data = featureFlagsJson as FeatureFlags;

    return (
      <Host
        class={{
          [hostStyle]: true,
        }}
      >
        {Object.entries(data).map(([name, section]) => {
          return (
            <div>
              <docs-in-page-link targetId={name}>
                <h2 id={name}>{name}</h2>
              </docs-in-page-link>

              {section.description ? <p>{section.description}</p> : undefined}

              {Object.entries(section.features).map(([flagName, flag]) => {
                return (
                  <amplify-feature-flag-summary
                    name={flagName}
                    feature={flag}
                  />
                );
              })}
            </div>
          );
        })}
      </Host>
    );
  }
}
