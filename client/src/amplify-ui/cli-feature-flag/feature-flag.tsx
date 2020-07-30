import {Component, Host, h, Prop, Element} from "@stencil/core";
import {hostStyle} from "./feature-flag.style";
import featureFlagsJson from "./feature-flags.json";

type FeatureFlags = Record<string, Section>;

type Section = {
  description: string;
  features: Record<string, FeatureFlag>;
};

export type FeatureFlag = {
  description: string;
  type: "Feature" | "Release" | "Experimental";
  valueType: "Boolean" | "Number" | "String";
  versionAdded: string;
  versionDeprecated?: string;
  deprecationDate?: string;
  versionRemoved?: string;
  removalDate?: string;
  values: Value[];
};

export type Value = {
  value: string;
  description: string;
  defaultNewProject: boolean;
  defaultExistingProject: boolean;
};

@Component({tag: "amplify-feature-flag", shadow: false})
export class AmplifyFeatureFlag {
  @Element() el: HTMLElement;

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
