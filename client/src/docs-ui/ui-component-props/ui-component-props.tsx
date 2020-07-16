import {Component, h, Prop, Host, State} from "@stencil/core";
import docs from "@aws-amplify/ui-components/dist/docs";
import {JsonDocsComponent} from "@stencil/core/internal";
import {tableStyle, tableHeaderStyle} from "./ui-component-props.style";

@Component({tag: "ui-component-props", shadow: false})
export class DocsUIComponentProps {
  /*** component tag for documented component page */
  @Prop() readonly tag: string;
  /*** whether or not the table contains header tags */
  @Prop() readonly useTableHeaders: boolean = false;

  @State() component: JsonDocsComponent | undefined;

  componentWillLoad() {
    this.component = docs.components.find(
      (component) => component.tag === this.tag,
    );
  }

  render() {
    const sectionId = `props-${this.component?.tag as string}`;
    let count = 0;

    return (
      <Host>
        {this.useTableHeaders ? (
          <docs-in-page-link targetId={sectionId}>
            <h2 id={sectionId}>Properties</h2>
          </docs-in-page-link>
        ) : (
          <h4>Properties</h4>
        )}

        {this.component?.props.map((prop) => {
          const groupId = `prop-${prop.attr || String(count)}`;
          if (!prop.attr) {
            count++;
          }

          return (
            <table class={tableStyle} key={groupId}>
              <thead>
                <tr>
                  <th colSpan={2}>
                    {this.useTableHeaders ? (
                      <docs-in-page-link targetId={groupId}>
                        <h3 id={groupId}>{prop.name}</h3>
                      </docs-in-page-link>
                    ) : (
                      <div class={tableHeaderStyle}>{prop.name}</div>
                    )}
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
          );
        })}
      </Host>
    );
  }
}
