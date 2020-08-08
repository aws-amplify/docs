import {Component, h, Prop} from "@stencil/core";
import {tableContainer, tableStyle, summaryRow} from "./feature-flag.style";
import {FeatureFlag} from "./feature-flag.types";

@Component({tag: "amplify-feature-flag-summary", shadow: false})
export class AmplifyFeatureFlagSummary {
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
        <div class={tableContainer}>
          <table class={tableStyle}>
            <thead>
              <tr class={summaryRow}>
                <th>Type</th>
                <th>Added</th>
                <th>Deprecation date</th>
                <th>Deprecated</th>
                <th>Removal date</th>
                <th>Removed</th>
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
        </div>

        <amplify-feature-flag-values values={this.feature.values} />
      </div>
    );
  }
}
