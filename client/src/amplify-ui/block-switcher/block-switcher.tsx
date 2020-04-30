import {Component, Host, h, Prop, State, Element} from "@stencil/core";
import {
  hostStyle,
  activeTabStyle,
  tabStyle,
  tabContainerStyle,
  contentStyle,
} from "./block-switcher.style";
import {css} from "emotion";

const getTabLocalStorageKey = (tabHeadingList: string): string =>
  `amplify-docs::${tabHeadingList}`;

@Component({tag: "amplify-block-switcher", shadow: false})
export class AmplifyCodeBlockSwitcher {
  @Element() el: HTMLElement;
  /** the tab headings, comma-separated as a single string */
  // @Prop() readonly tabHeadingList?: string;

  @State() activeChildI = 0;

  tabsHeadings: string[];

  tabLocalStorageKey: string;

  componentWillLoad() {
    const children = Array.from(this.el.children);
    const blocks = children.filter((child) => {
      return child.matches("amplify-block");
    });

    // const [{ id: name }] = blocks;
    // console.log(name)

    const headings: string[] = [];
    blocks.forEach((block) => {
      headings.push(block.id);
    });
    // for (const block of blocks) {
    //   headings.push(block.id);
    // }
    this.tabsHeadings = headings;
    console.log(this.tabsHeadings);
    // this.tabsHeadings = [...blocks]
    // let headings = [];
    // for (block in blocks) {
    //   headings.push(block.id);
    // }
    // blocks.map((block) => {
    //   return headings.push(block);
    // });

    // const blockId = blocks[0].id;
    // console.log(blockId);

    // const blocks = this.el.getElementsByTagName("amplify-block");
    // console.log(blocks[0].name);

    // if (this.tabHeadingList) {
    //   // get the split array of headings, to map over (for rendering buttons)
    //   this.tabsHeadings = this.tabHeadingList.split(",").map((e) => e.trim());
    //   // set the local storage key, so we can persist tab selection cross-session
    //   this.tabLocalStorageKey = getTabLocalStorageKey(this.tabHeadingList);
    //   // get from the previous session, if present
    //   const persistedActiveChildI =
    //     localStorage.getItem(this.tabLocalStorageKey) || undefined;
    //   // ... if persisted selection is present...
    //   if (typeof persistedActiveChildI === "string") {
    //     // set the active child in state
    //     this.activeChildI = parseInt(persistedActiveChildI);
    //   }
    // }
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
        <div class={contentStyle}>
          <slot />
        </div>
      </Host>
    );
  }
}
