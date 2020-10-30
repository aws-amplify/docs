import {Component, h, Prop} from "@stencil/core";
import {AuthenticatorWithSlots} from "./custom-components/authenticator-with-slots";
import {CustomComponentName} from "./component-playground.types";

@Component({
  tag: "docs-component-playground",
  styleUrl: "component-playground.styles.scss",
})
export class DocsComponentPlayground {
  /** Name of component used in the playground */
  @Prop() readonly componentName: CustomComponentName;

  renderCustomComponent(componentName: CustomComponentName) {
    switch (componentName) {
      case "AuthenticatorWithSlots":
        return AuthenticatorWithSlots();
    }
  }

  render() {
    return this.renderCustomComponent(this.componentName);
  }
}
