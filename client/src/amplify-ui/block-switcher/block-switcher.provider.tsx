import {Component, h, State} from "@stencil/core";
import {
  SelectedTabHeadings,
  SetNewSelectedTabHeadings,
} from "./block-switcher.types";
import {blockSwitcherContext} from "./block-switcher.context";

const SELECTED_TABS_LOCAL_STORAGE_KEY = `amplify-docs::selected-tabs`;

@Component({tag: "amplify-block-switcher-provider", shadow: false})
export class AmplifyBlockSwitcherProvider {
  // list of previously tab headings in order of priority
  @State() selectedTabHeadings: SelectedTabHeadings = [];

  setSelectedNewSelectedTabHeading: SetNewSelectedTabHeadings = (
    tabHeading,
  ) => {
    // create temp array with `tabHeading` (the new highest priority) as first el
    const temp = new Array<string>();
    temp.push(tabHeading);

    // iterate through previous `selectedTabHeadings`
    this.selectedTabHeadings.forEach((e) => {
      // no repeats allowed!
      if (tabHeading !== e) {
        // ensure preexisting tab name priorities are preserved
        temp.push(e);
      }
    });

    // set the new priority list in state
    this.selectedTabHeadings = temp;

    // and serialize and save it to local storage
    localStorage.setItem(
      SELECTED_TABS_LOCAL_STORAGE_KEY,
      JSON.stringify(this.selectedTabHeadings),
    );
  };

  componentWillLoad() {
    // gather list of previously-selected tab headings (might be null)
    const persistedSelectedTabsSerialized =
      localStorage.getItem(SELECTED_TABS_LOCAL_STORAGE_KEY) || undefined;
    if (persistedSelectedTabsSerialized) {
      // save that selection array if it exists (otherwise, list is empty)
      this.selectedTabHeadings = JSON.parse(persistedSelectedTabsSerialized);
    }
  }

  render() {
    return (
      <blockSwitcherContext.Provider
        state={{
          selectedTabHeadings: this.selectedTabHeadings,
          setNewSelectedTabHeadings: this.setSelectedNewSelectedTabHeading,
        }}
      >
        <slot />
      </blockSwitcherContext.Provider>
    );
  }
}
