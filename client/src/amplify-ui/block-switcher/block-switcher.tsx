import {Component, Host, h, Prop, State, Element, Watch} from "@stencil/core";
import {
  hostStyle,
  activeTabStyle,
  tabStyle,
  tabContainerStyle,
  contentStyle,
} from "./block-switcher.style";
import {css} from "emotion";
import {pageContext} from "../../docs-ui/page/page.context";
import {
  SelectedTabHeadings,
  SetNewSelectedTabHeadings,
} from "../../docs-ui/page/page.types";

const BLOCK_TAG_NAME = "amplify-block";

@Component({tag: "amplify-block-switcher", shadow: false})
export class AmplifyBlockSwitcher {
  @Element() el: HTMLElement;

  /** list of previously tab headings in order of priority, passed from global provider */
  @Prop() readonly selectedTabHeadings: SelectedTabHeadings;
  /** tack on a new tab heading at highest priority */
  @Prop() readonly setNewSelectedTabHeadings: SetNewSelectedTabHeadings;
  /** increments whenever the platform changes and we need to refresh the tabHeadings */
  @Prop() readonly alwaysRerenderBlockSwitcher: number;

  @State() activeChildI = 0;

  tabHeadings: string[] = [];

  componentWillRender() {
    this.gatherHeadings();
  }

  // recursively traverse the DOM tree to gather the language names from all child code blocks.
  // when originally constructed, the code blocks are briefly direct children of the block-switcher, living in the shadow DOM,
  // but then they are moved into slots, which are further down in the component, and thus we must recurse down to reach them.
  recursivelyFindBlocks(el: HTMLElement) {
    if (el.matches(BLOCK_TAG_NAME)) {
      // somehow this doesn't cause a rerender each time a heading is pushed, just at the end
      this.tabHeadings.push(((el as any) as {name: string}).name);
      return;
    }
    const children = Array.from(el.children);
    for (const child of children) {
      this.recursivelyFindBlocks(child as HTMLElement);
    }
  }

  gatherHeadings() {
    // gather tab headings from child `amplify-block` attrs
    this.tabHeadings = [];
    this.recursivelyFindBlocks(this.el);

    // default to the first tab
    this.activeChildI = 0;

    if (this.tabHeadings?.length > 0 && this.selectedTabHeadings?.length > 0) {
      // iterate through previous selections, and see if we have any shared
      for (let i = 0; i < this.selectedTabHeadings.length; i++) {
        const current = this.selectedTabHeadings[i];
        if (this.tabHeadings.includes(current)) {
          // if so, let's set its index in state!
          this.activeChildI = this.tabHeadings.indexOf(current);
          break;
        }
      }
    }
  }

  @Watch("selectedTabHeadings")
  synchronizeSameTabs(): void {
    for (const e of this.selectedTabHeadings) {
      const eIndexInTabHeadings = this.tabHeadings.indexOf(e);
      if (eIndexInTabHeadings >= 0) {
        this.activeChildI = eIndexInTabHeadings;
        break;
      }
    }
  }

  createActiveChildISetter = (i: number) => (_event: Event): void => {
    this.activeChildI = i;
    const current = this.tabHeadings[i];
    this.setNewSelectedTabHeadings(current);
  };

  render() {
    // + 1 because CSS child indices start at 1
    const revealStyle = css`
      amplify-block:nth-of-type(${this.activeChildI + 1}) {
        display: initial;
      }
    `;

    return (
      <Host
        class={{
          [hostStyle]: true,
          [revealStyle]: true,
        }}
      >
        <div class={tabContainerStyle}>
          {this.tabHeadings?.map((e, i) => {
            return (
              <button
                onClick={this.createActiveChildISetter(i)}
                class={{
                  [activeTabStyle]: this.activeChildI === i,
                  [tabStyle]: true,
                }}
                key={e}
              >
                {e}
              </button>
            );
          })}
        </div>
        <div class={contentStyle}>
          <slot />
        </div>
      </Host>
    );
  }
}

pageContext.injectProps(AmplifyBlockSwitcher, [
  "alwaysRerenderBlockSwitcher",
  "selectedTabHeadings",
  "setNewSelectedTabHeadings",
]);
