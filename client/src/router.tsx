import {Component, h} from "@stencil/core";

@Component({tag: "docs-router", shadow: false})
export class DocsRouter {
  render() {
    return (
      <stencil-router>
        {/* https://github.com/ionic-team/stencil-router/issues/104 */}
        <stencil-route-switch scrollTopOffset={1}>
          <stencil-route url="/:page*" component="docs-page" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
