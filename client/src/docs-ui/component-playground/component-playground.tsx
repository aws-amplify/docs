import {Component, h, Prop} from "@stencil/core";
import {AuthenticatorWithSlots} from "./custom-components/authenticator-with-slots";

@Component({
  tag: "docs-component-playground",
})
export class DocsComponentPlayground {
  /** Name of component used in the playground */
  @Prop() readonly componentName: string;

  renderCustomComponent(componentName: string) {
    switch (componentName) {
      case "AuthenticatorWithSlots":
        return AuthenticatorWithSlots();
    }
  }

  render() {
    return this.renderCustomComponent(this.componentName);
  }
}