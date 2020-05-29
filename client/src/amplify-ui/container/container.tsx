import {Component, h, Prop, Host} from "@stencil/core";
import {containerStyle} from "./container.style";

@Component({tag: "docs-container", shadow: false})
export class AmplifyContainer {
  /*** incase users want to add a class to the inner div */
  @Prop() readonly innerClass?: string;

  render() {
    return (
      <Host class={containerStyle}>
        <div
          class={{
            ...(this.innerClass ? {[this.innerClass]: true} : {}),
          }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
