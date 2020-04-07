import {Component, h, State, Watch} from "@stencil/core";
import {routes} from "./api";

@Component({tag: "docs-router", shadow: false})
export class DocsRouter {
  render() {
    return (
      <stencil-router>
        {/* https://github.com/ionic-team/stencil-router/issues/104 */}
        <stencil-route-switch scrollTopOffset={1}>
          {routes.map((route) => (
            <stencil-route
              key={route}
              url={route}
              component="docs-page"
              exact={true}
            />
          ))}
          <stencil-route url="/story" component="docs-story-page" />
          <stencil-route component="docs-404-page" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
