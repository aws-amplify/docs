import ExternalLink from "../ExternalLink";

import docs from "@aws-amplify/ui-components/dist/docs";
import {tableGeneratorMap} from "../TableGenerator";
import {WebComponentProps} from "../../utils/ui-component-props.types";
import {ATTR_HEADER, CSS_HEADER, SLOTS_HEADER} from "../../constants/strings";
import getElementTop from "../../utils/get-element-top";

const stickyHeaderHeight = 54;

const headerNames: Record<WebComponentProps, string> = {
  attr: ATTR_HEADER,
  css: CSS_HEADER,
  slots: SLOTS_HEADER,
};

export default function UiComponentProps({
  tag,
  useTableHeaders = false,
  propType = "attr",
}) {
  const component = docs.components.find((component) => component.tag === tag);

  if (!component || !component.tag || propsAreEmpty({propType, component})) {
    return null;
  }

  const tableGenerator = tableGeneratorMap[propType];
  return (
    <div>
      <Header
        useTableHeaders={useTableHeaders}
        propType={propType}
        component={component}
      />
      <Content propType={propType} component={component} />
      {tableGenerator(component)}
    </div>
  );
}

function Header({useTableHeaders = false, propType = "attr", component}) {
  const sectionId = `props-${propType}-${component?.tag}`;
  return useTableHeaders ? (
    <a
      href={"#" + sectionId}
      onClick={(e) => {
        e.preventDefault();
        const top = getElementTop(
          document.getElementById(sectionId),
          stickyHeaderHeight,
        );
        if (top !== window.scrollY) {
          window.scrollTo({top});
          history.replaceState(undefined, document.title, `#${sectionId}`);
        }
      }}
    >
      <h2 id={sectionId}>{headerNames[propType]}</h2>
    </a>
  ) : (
    <h4>{headerNames[propType]}</h4>
  );
}

function Content({propType, component}) {
  if (propType === "attr") {
    return (
      <p>
        <code>{component?.tag}</code>
        &nbsp;provides the following properties to configure the component.
      </p>
    );
  } else if (propType === "css") {
    return (
      <p>
        <code>{component?.tag}</code>
        &nbsp;provides the following&nbsp;
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
          css properties
        </ExternalLink>
        &nbsp;to modify the style at component level.
      </p>
    );
  } else if (propType === "slots") {
    return (
      <p>
        <code>{component?.tag}</code>
        &nbsp;provides the following slots based off of the&nbsp;
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">
          Web Components slot
        </ExternalLink>
        &nbsp;element.
      </p>
    );
  }
}

function propsAreEmpty({propType, component}) {
  return (
    (propType === "attr" && component?.props.length === 0) ||
    (propType === "css" && component?.styles.length === 0) ||
    (propType === "slots" && component?.slots.length === 0)
  );
}

// @Component({tag: "UiComponentProps", shadow: false})
// export class DocsUIComponentProps {
//   /*** component tag for documented component page */
//   @Prop() readonly tag: string;
//   /*** whether or not the table contains header tags */
//   @Prop() readonly useTableHeaders: boolean = false;
//   /** Desired property to document */
//   @Prop() readonly propType: WebComponentProps = "attr";

//   @State() component: JsonDocsComponent | undefined;

//   componentWillRender() {
//     this.component = docs.components.find(
//       (component) => component.tag === this.tag,
//     );
//   }

//   header() {
//     const sectionId = `props-${this.propType}-${this.component?.tag as string}`;
//     return this.useTableHeaders ? (
//       <docs-in-page-link targetId={sectionId}>
//         <h2 id={sectionId}>{headerNames[this.propType]}</h2>
//       </docs-in-page-link>
//     ) : (
//       <h4>{headerNames[this.propType]}</h4>
//     );
//   }

//   content() {
//     if (this.propType === "attr") {
//       return (
//         <p>
//           <code>{this.component?.tag}</code>
//           &nbsp;provides the following properties to configure the component.
//         </p>
//       );
//     } else if (this.propType === "css") {
//       return (
//         <p>
//           <code>{this.component?.tag}</code>
//           &nbsp;provides the following&nbsp;
//           <amplify-external-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
//             css properties
//           </amplify-external-link>
//           &nbsp;to modify the style at component level.
//         </p>
//       );
//     } else if (this.propType === "slots") {
//       return (
//         <p>
//           <code>{this.component?.tag}</code>
//           &nbsp;provides the following slots based off of the&nbsp;
//           <amplify-external-link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">
//             Web Components slot
//           </amplify-external-link>
//           &nbsp;element.
//         </p>
//       );
//     }
//   }

//   propsAreEmpty = () => {
//     return (
//       (this.propType === "attr" && this.component?.props.length === 0) ||
//       (this.propType === "css" && this.component?.styles.length === 0) ||
//       (this.propType === "slots" && this.component?.slots.length === 0)
//     );
//   };

//   render() {
//     if (!this.component || !this.component.tag || this.propsAreEmpty()) return;

//     const tableGenerator = tableGeneratorMap[this.propType];
//     return (
//       <Host>
//         {this.header()}
//         {this.content()}
//         {tableGenerator(this.component)}
//       </Host>
//     );
//   }
// }
