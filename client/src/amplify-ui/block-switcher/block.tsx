import {Component, Host, h, Prop, Element, State, Listen} from "@stencil/core";

@Component({tag: "amplify-block", shadow: false})
export class AmplifyCodeBlock {
  /** Block name */
  @Prop() readonly name?: string;

  @Element() el: HTMLElement;

  @State() isActive = false;

  @Listen("active-codeblock-updated", {target: "window"})
  activeBlockUpdateHandler(e: CustomEvent<string>) {
    if (e.detail === this.name) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  componentWillLoad() {
    this.checkParentSwitcherAttributes();
  }

  componentDidLoad() {
    this.checkParentSwitcherAttributes();
  }

  checkParentSwitcherAttributes() {
    if (typeof window !== "undefined") {
      const switcher = this.el.closest("amplify-block-switcher");
      const {value: activeTab} =
        switcher?.attributes.getNamedItem("data-active-tab") ?? {};

      if (activeTab === this.name) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    }
  }

  render() {
    return (
      <Host
        name={this.name}
        class={{
          activeCodeBlock: this.isActive,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
