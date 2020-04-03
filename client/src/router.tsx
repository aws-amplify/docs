import {
  Component,
  h,
  State,
  Event,
  EventEmitter,
  Build,
  Listen,
} from "@stencil/core";
import {routes} from "./api";
import {internalLinkContext} from "./docs-ui/internal-link/internal-link.context";
import {SetCurrentPath} from "./docs-ui/internal-link/internal-link.types";
import {setPopped} from "./utils/pop-state";

@Component({tag: "docs-router", shadow: false})
export class DocsRouter {
  /** even for when routes render */
  @Event() routeDidRender: EventEmitter;

  @State() currentPath = `${location.pathname}${location.search}`;

  observer?: MutationObserver;
  ref?: HTMLElement;

  setCurrentPath: SetCurrentPath = (route) => (this.currentPath = route);

  componentDidLoad() {
    addEventListener("popstate", () => {
      setPopped(true);
      this.currentPath = `${location.pathname}${location.search}`;
    });
  }

  triggerEventIfRouteDisplayChange = () => {
    this.routeDidRender.emit();
  };

  setRef = (ref: HTMLElement | undefined) => {
    if (Build.isBrowser) {
      if (this.observer) {
        this.observer.disconnect();
      }

      if (ref) {
        this.observer = new MutationObserver(
          this.triggerEventIfRouteDisplayChange,
        );

        this.observer.observe(ref, {
          childList: true,
          attributes: true,
          subtree: false,
        });
      }
    }
  };

  componentDidUnload() {
    this.observer?.disconnect();
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
          <stencil-route-switch scrollTopOffset={1} ref={this.setRef}>
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
