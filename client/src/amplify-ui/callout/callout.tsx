import {Component, h, Prop, Host} from "@stencil/core";
import {hostStyle, styleByType} from "./callout.style";

@Component({tag: "amplify-callout", shadow: false})
export class AmplifyCallout {
  /*** is it a warning? */
  @Prop() readonly warning?: boolean;

  type?: "error" | "warning";

  componentWillLoad() {
    this.type = this.warning ? "warning" : undefined;
  }

  render() {
    return (
      <Host
        class={{
          [hostStyle]: true,
          [styleByType[this.type || "info"]]: true,
        }}
      >
        <div>
          <slot />
        </div>
      </Host>
    );
  }
}
