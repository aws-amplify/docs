import {Component, Host, h, Prop, Element} from "@stencil/core";
import {Value} from "./feature-flag";
import {
  tableStyle,
  descriptionCell,
  valueCell,
  projectCell,
} from "./feature-flag.style";

@Component({tag: "amplify-feature-flag-value", shadow: false})
export class AmplifyFeatureFlagSummary {
  @Element() el: HTMLElement;

  /** name of the feature flag */
  @Prop() readonly name: string;

  /** data of the feature flag */
  @Prop() readonly values: Value[];

  render() {
    return (
      <table class={tableStyle}>
        <thead>
          <tr>
            <th class={valueCell}>Value</th>
            <th>Description</th>
            <th class={projectCell}>
              Default for
              <br />
              existing projects
            </th>
            <th class={projectCell}>
              Default for
              <br />
              new projects
            </th>
          </tr>
        </thead>
        <tbody>
          {this.values.map((value) => {
            return (
              <tr>
                <td>
                  <code>{value.value}</code>
                </td>
                <td class={descriptionCell}>{value.description}</td>
                <td>{value.defaultExistingProject ? "✅" : ""}</td>
                <td>{value.defaultNewProject ? "✅" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
