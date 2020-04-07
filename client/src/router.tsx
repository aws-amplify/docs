import {Component, h, State, Watch} from "@stencil/core";
import {routes} from "./api";
import {internalLinkContext} from "./docs-ui/internal-link/internal-link.context";
import {SetCurrentPath} from "./docs-ui/internal-link/internal-link.types";
import {setPopped} from "./utils/pop-state";

@Component({tag: "docs-router", shadow: false})
export class DocsRouter {
  @State() currentPath = `${location.pathname}${location.search}`;

  setCurrentPath: SetCurrentPath = (route) => (this.currentPath = route);

  componentDidLoad() {
    addEventListener("popstate", () => {
      setPopped(true);
      this.currentPath = `${location.pathname}${location.search}`;
    });
  }

  render() {
    return (
      <internalLinkContext.Provider
        state={{
          currentPath: this.currentPath,
          setCurrentPath: this.setCurrentPath,
        }}
      >
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
      </internalLinkContext.Provider>
    );
  }
}
