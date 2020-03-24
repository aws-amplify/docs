import {Component, h, Prop, Host, State} from "@stencil/core";
import docs from "@aws-amplify/ui-components/dist/docs";
import {JsonDocsComponent} from "@stencil/core/internal";

@Component({tag: "ui-component-page", shadow: false})
export class DocsCard {
  /*** component tag for documented component page */
  @Prop() readonly tag: string;

  @State() component: JsonDocsComponent | undefined;

  render() {
    console.log(docs.components);
    this.component = docs.components.find(
      (component) => component.tag === this.tag,
    );
    console.log(this.component);
    return (
      <Host>
        {this.component?.props.map(prop => <div>{prop.name}</div>)}
      </Host>
    );
  }
}
