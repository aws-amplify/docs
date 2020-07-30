import {Component, Host, h, Prop, Element} from "@stencil/core";
import {FeatureFlag} from "./feature-flag";
import {tableStyle, summaryCell} from "./feature-flag.style";

@Component({tag: "amplify-feature-flag-summary", shadow: false})
export class AmplifyFeatureFlagSummary {
  @Element() el: HTMLElement;

  /** name of the feature flag */
  @Prop() readonly name: string;

  /** data of the feature flag */
  @Prop() readonly feature: FeatureFlag;

  render() {
    return (
      <div>
        <docs-in-page-link targetId={this.name}>
          <h3 id={this.name}>{this.name}</h3>
        </docs-in-page-link>

        {this.feature.description ? (
          <p>{this.feature.description}</p>
        ) : (
          undefined
        )}
        <table class={tableStyle}>
          <thead>
            <tr>
              <th class={summaryCell}>Type</th>
              <th class={summaryCell}>Added</th>
              <th class={summaryCell}>Deprecation date</th>
              <th class={summaryCell}>Deprecated</th>
              <th class={summaryCell}>Removal date</th>
              <th class={summaryCell}>Removed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.feature.type}</td>
              <td>{this.feature.versionAdded}</td>
              <td>{this.feature.deprecationDate}</td>
              <td>{this.feature.versionDeprecated}</td>
              <td>{this.feature.removalDate}</td>
              <td>{this.feature.versionRemoved}</td>
            </tr>
          </tbody>
        </table>

        <amplify-feature-flag-value values={this.feature.values} />
      </div>
    );
  }
}
