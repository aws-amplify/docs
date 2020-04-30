import {Component, Host, h, Prop, State, Element} from "@stencil/core";
import {
  hostStyle,
  activeTabStyle,
  tabStyle,
  tabContainerStyle,
  contentStyle,
} from "./block-switcher.style";
import {AmplifyCodeBlock} from "./block";

import {css} from "emotion";

const getTabLocalStorageKey = (tabHeadingList: string): string =>
  `amplify-docs::${tabHeadingList}`;

@Component({tag: "amplify-block-switcher", shadow: false})
export class AmplifyCodeBlockSwitcher {
  @Element() el: HTMLElement;
  /** the tab headings, comma-separated as a single string */
  // @Prop() readonly tabHeadingList?: string;

  @State() activeChildI = 0;

  tabHeadings: string[];

  tabLocalStorageKey: string;

  componentWillLoad() {
    const children = Array.from(this.el.children);
    const blocks = children.filter((child) => {
      return child.matches("amplify-block");
    });

    const headings: string[] = [];
    blocks.forEach((block) => {
      // @ts-ignore
      headings.push(block.name);
    });
    this.tabHeadings = headings;

    if (this.tabHeadings) {
      // set the local storage key, so we can persist tab selection cross-session
      this.tabLocalStorageKey = getTabLocalStorageKey(
        this.tabHeadings.toString(),
      );
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
