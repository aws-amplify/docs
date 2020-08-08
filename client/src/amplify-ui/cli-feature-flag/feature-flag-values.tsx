import {Component, h, Prop} from "@stencil/core";
import {
  tableContainer,
  tableStyle,
  descriptionCell,
  valueCell,
  projectCell,
} from "./feature-flag.style";
import {Value} from "./feature-flag.types";

@Component({tag: "amplify-feature-flag-values", shadow: false})
export class AmplifyFeatureFlagValues {
  /** name of the feature flag */
  @Prop() readonly name: string;

  /** data of the feature flag */
  @Prop() readonly values: Value[];

  render() {
    return (
      <div class={tableContainer}>
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
      </div>
    );
  }
}
