import {Component, h, Prop, Host, State} from "@stencil/core";
import docs from "@aws-amplify/ui-components/dist/docs";
import {JsonDocsComponent} from "@stencil/core/internal";
import {tableStyle} from "./ui-component-props.style";

@Component({tag: "ui-component-props", shadow: false})
export class DocsCard {
  /*** component tag for documented component page */
  @Prop() readonly tag: string;

  @State() component: JsonDocsComponent | undefined;

  componentWillLoad() {
    this.component = docs.components.find(
      (component) => component.tag === this.tag,
    );
  }

  render() {
    return (
      <Host>
        <h2>Properties</h2>
        {this.component?.props.map((prop) => (
          <table class={tableStyle}>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>{prop.name}</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {prop.attr && (
                <tr>
                  <th>Attribute</th>
                  <td>{prop.attr}</td>
                </tr>
              )}
              <tr>
                <th>Description</th>
                <td>{prop.docs}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{prop.type}</td>
              </tr>
              {prop.default && (
                <tr>
                  <th>Default</th>
                  <td>{prop.default}</td>
                </tr>
              )}
            </tbody>
          </table>
        ))}
      </Host>
    );
  }
}
