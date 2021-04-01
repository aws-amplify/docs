import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Watch,
  Event,
  EventEmitter,
} from "@stencil/core";
import {
  hostStyle,
  activeTabStyle,
  tabStyle,
  tabContainerStyle,
  contentStyle,
} from "./block-switcher.style";
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
    this.handleInitSelectedTabHeading();
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

  handleInitSelectedTabHeading() {
    if (this.tabHeadings?.length > 0 && this.selectedTabHeadings?.length > 0) {
      for (const heading of this.selectedTabHeadings) {
        if (this.tabHeadings.includes(heading)) {
          this.activeChildI = this.tabHeadings.indexOf(heading);
          return;
        }
      }
    } else {
      if (typeof window === "undefined") {
        this.activeChildI = 0;
      } else {
        this.activeChildI = 0;
      }
    }
  }

  gatherHeadings() {
    // gather tab headings from child `amplify-block` attrs
    this.tabHeadings = [];
    this.recursivelyFindBlocks(this.el);
  }

  /* eslint-disable */
  @Event({
    eventName: "active-codeblock-updated",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  activeBlockUpdated: EventEmitter<string>;

  @Watch("activeChildI")
  activeChildWatcher(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      const newEventDetail = this.tabHeadings[newValue];
      this.activeBlockUpdated.emit(newEventDetail);
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

  handleButtonClick(newActiveChild: number) {
    const newlySelected = this.tabHeadings[newActiveChild];
    this.setNewSelectedTabHeadings(newlySelected);
    this.activeChildI = newActiveChild;
  }

  renderTabHeading(name: string, i: number) {
    return (
      <button
        onClick={() => this.handleButtonClick(i)}
        class={{
          [activeTabStyle]: this.activeChildI === i,
          [tabStyle]: true,
        }}
        key={name}
      >
        {name}
      </button>
    );
  }

  render() {
    const activeTab = this.tabHeadings[this.activeChildI];
    return (
      <Host
        data-active-tab={activeTab}
        class={{
          [hostStyle]: true,
        }}
      >
        <div class={tabContainerStyle}>
          {this.tabHeadings?.map(this.renderTabHeading.bind(this))}
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
