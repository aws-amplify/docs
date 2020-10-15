import {Component, h, Prop, Host, State} from "@stencil/core";
import docs from "@aws-amplify/ui-components/dist/docs";
import {JsonDocsComponent} from "@stencil/core/internal";
import {tableGeneratorMap} from "./table-generator";
import {WebComponentProps} from "./ui-component-props.types";
import {ATTR_HEADER, CSS_HEADER, SLOTS_HEADER} from "../../constants/strings";

const headerNames: Record<WebComponentProps, string> = {
  [WebComponentProps.ATTR]: ATTR_HEADER,
  [WebComponentProps.CSS]: CSS_HEADER,
  [WebComponentProps.SLOTS]: SLOTS_HEADER,
};

@Component({tag: "ui-component-props", shadow: false})
export class DocsUIComponentProps {
  /*** component tag for documented component page */
  @Prop() readonly tag: string;
  /*** whether or not the table contains header tags */
  @Prop() readonly useTableHeaders: boolean = false;
  /** Desired property to document */
  @Prop() readonly propType: WebComponentProps = WebComponentProps.ATTR;

  @State() component: JsonDocsComponent | undefined;

  componentWillLoad() {
    this.component = docs.components.find(
      (component) => component.tag === this.tag,
    );
  }

  header() {
    const sectionId = `props-${this.propType}-${this.component?.tag as string}`;
    return this.useTableHeaders ? (
      <docs-in-page-link targetId={sectionId}>
        <h2 id={sectionId}>{headerNames[this.propType]}</h2>
      </docs-in-page-link>
    ) : (
      <h4>{headerNames[this.propType]}</h4>
    );
  }

  content() {
    if (this.propType === WebComponentProps.ATTR) {
      return (
        <p>
          <code>{this.component?.tag}</code>
          &nbsp;provides the following properties to configure the component.
        </p>
      );
    } else if (this.propType === WebComponentProps.CSS) {
      return (
        <p>
          <code>{this.component?.tag}</code>
          &nbsp;provides the following&nbsp;
          <amplify-external-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
            css properties
          </amplify-external-link>
          &nbsp;to modify the style at component level.
        </p>
      );
    } else if (this.propType === WebComponentProps.SLOTS) {
      return (
        <p>
          <code>{this.component?.tag}</code>
          &nbsp;provides the following slots based off of the&nbsp;
          <amplify-external-link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">
            Web Components slot
          </amplify-external-link>
          &nbsp;element.
        </p>
      );
    }
  }

  render() {
    if (!this.component || !this.component.tag) return;
    const tableGenerator = tableGeneratorMap[this.propType];
    return (
      <Host>
        {this.header()}
        {this.content()}
        {tableGenerator(this.component)}
      </Host>
    );
  }
}
