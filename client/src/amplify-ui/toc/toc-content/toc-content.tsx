import {Component, Element, Host, Prop, h} from "@stencil/core";
import {tocContext} from "../toc.context";
import {SetContent} from "../toc.types";

@Component({tag: "amplify-toc-contents", shadow: false})
export class AmplifyTOCContent {
  @Element() content?: HTMLElement;
  /**
   * Sets `content` prop within parent `amplify-toc-provider`,
   * which propogates into the provider's child `amplify-toc` instances
   */
  @Prop() readonly setContent?: SetContent;

  componentDidRender() {
    this.setContent && this.content && this.setContent(this.content);
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}

tocContext.injectProps(AmplifyTOCContent, ["setContent"]);
