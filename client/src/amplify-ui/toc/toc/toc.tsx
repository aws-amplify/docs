import {Component, Host, Listen, Prop, State, h} from "@stencil/core";
import {tocContext} from "../toc.context";
import {sidebarLayoutContext} from "../../sidebar-layout/sidebar-layout.context";
import {tocStyle, h2AnchorStyle, h3AnchorStyle, headerStyle} from "./toc.style";
import {getElementTop} from "../../../utils/get-element-top";

const headingStyleByTagName = {
  H2: h2AnchorStyle,
  H3: h3AnchorStyle,
};

@Component({tag: "amplify-toc", shadow: false})
export class AmplifyTOC {
  /**
   * A list of `h2` and/or `h3` nodes, provided by either of 2 means:
   * 1. User-provided (`<amplify-toc elements={[...h2h3DomNodes]} />`)
   * 2. Provider-injected (within parent `amplify-toc-provider`, sibling
   * an `amplify-toc-content` instance)
   */
  @Prop() readonly elements?: HTMLElement[];
  /**
   * Whether or not the left sidebar is in view; injected from the sidebar context.
   * If the left sidebar isn't in view, there is more space for this table of contents
   */
  @Prop() readonly inView?: boolean;
  /*** the title of the page on which this TOC is being rendered */
  @Prop() readonly pageTitle?: string;
  /*** offset the active item (useful when combatting sticky header) */
  @Prop() readonly stickyHeaderHeight = 54;

  @State() activeLinkI?: number;
  previous?: number;

  @Listen("scroll", {target: "window"})
  @Listen("resize", {target: "window"})
  setActiveLink() {
    if (this.elements) {
      let i = this.elements.findIndex(
        (e) => getElementTop(e, this.stickyHeaderHeight) - 3 > window.scrollY,
      );
      if (i === -1) {
        i = this.elements.length;
      }
      this.activeLinkI = i - 1;
      if (this.activeLinkI !== this.previous) {
        this.previous = this.activeLinkI;
        if (this.activeLinkI >= 0) {
          const activeElement = this.elements[this.activeLinkI];
          if (activeElement) {
            history.replaceState(
              undefined,
              document.title,
              `#${activeElement.id}`,
            );
          }
        } else {
          history.replaceState(
            undefined,
            document.title,
            window.location.href.split("#")[0],
          );
        }
      }
    }
  }

  render() {
    return (
      this.elements &&
      this.elements.length > 0 && (
        <Host class={(this.inView ? "" : "more-width ") + tocStyle}>
          <div>
            <h4 class={headerStyle}>{this.pageTitle || "Contents"}</h4>
            {this.elements.map((e, i) => {
              const headingAnchorClass = headingStyleByTagName[e.tagName];
              return (
                <docs-in-page-link
                  targetId={e.id}
                  class={{
                    active: i === this.activeLinkI,
                    [headingAnchorClass]: true,
                  }}
                >
                  <div innerHTML={e.innerHTML} />
                </docs-in-page-link>
              );
            })}
          </div>
        </Host>
      )
    );
  }
}

tocContext.injectProps(AmplifyTOC, ["elements"]);
sidebarLayoutContext.injectProps(AmplifyTOC, ["inView"]);
