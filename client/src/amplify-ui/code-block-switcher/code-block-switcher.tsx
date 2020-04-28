import {Component, Host, h, Prop, State} from "@stencil/core";
import {
  hostStyle,
  activeTabStyle,
  tabStyle,
  tabContainerStyle,
} from "./code-block-switcher.style";
import {css} from "emotion";

const getTabLocalStorageKey = (tabHeadingList: string): string =>
  `amplify-docs::${tabHeadingList}`;

@Component({tag: "amplify-code-block-switcher", shadow: false})
export class AmplifyCodeBlockSwitcher {
  /** the tab headings, comma-separated as a single string */
  @Prop() readonly tabHeadingList?: string;

  @State() activeChildI = 0;

  tabsHeadings: string[];

  tabLocalStorageKey: string;

  componentWillLoad() {
    if (this.tabHeadingList) {
      // get the split array of headings, to map over (for rendering buttons)
      this.tabsHeadings = this.tabHeadingList.split(",").map((e) => e.trim());
      // set the local storage key, so we can persist tab selection cross-session
      this.tabLocalStorageKey = getTabLocalStorageKey(this.tabHeadingList);
      // get from the previous session, if present
      const persistedActiveChildI =
        localStorage.getItem(this.tabLocalStorageKey) || undefined;
      // ... if persisted selection is present...
      if (typeof persistedActiveChildI === "string") {
        // set the active child in state
        this.activeChildI = parseInt(persistedActiveChildI);
      }
    }
  }

  createActiveChildISetter = (i: number) => (_event: Event): void => {
    this.activeChildI = i;
    localStorage.setItem(this.tabLocalStorageKey, String(i));
  };

  render() {
    // + 2 because CSS child indices start at 1, and the first child in the host is the div of tabs
    const revealStyle = css`
      > pre:nth-of-type(${this.activeChildI + 1}) {
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
          {this.tabsHeadings?.map((e, i) => {
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
        <slot />
      </Host>
    );
  }
}
