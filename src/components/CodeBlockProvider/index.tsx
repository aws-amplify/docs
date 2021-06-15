import {createContext, useContext, useState} from "react";

const CodeBlockContext = createContext({
  tabOrder: [],
  setActiveTab: (_) => {
    return;
  },
});

const SELECTED_TABS_LOCAL_STORAGE_KEY = `amplify-docs::selected-tabs`;

const restoreBlockSwitcherState = function() {
  if (typeof localStorage === "undefined") return [];
  // Gather list of previously-selected tab headings (might be null)
  const persistedSelectedTabsSerialized =
    localStorage.getItem(SELECTED_TABS_LOCAL_STORAGE_KEY) || undefined;
  if (persistedSelectedTabsSerialized) {
    // save that selection array if it exists (otherwise, list is empty)
    return JSON.parse(persistedSelectedTabsSerialized);
  }
  return [];
};

export default function CodeBlockProvider({children}) {
  const [tabOrder, setTabOrder] = useState(restoreBlockSwitcherState());

  const setActiveTab = (tabName) => {
    // Break out early to avoid rerendering if the currently active tab is clicked
    if (tabName === tabOrder[0]) return;
    // Create temp array with `tabHeading` (the new highest priority) as the first element
    const nextSelectedTabHeadings = new Array<string>();
    nextSelectedTabHeadings.push(tabName);

    // Iterate through previous `selectedTabHeadings`
    tabOrder.forEach((e) => {
      // No repeats allowed!
      if (tabName !== e) {
        // Ensure preexisting tab name priorities are preserved
        nextSelectedTabHeadings.push(e);
      }
    });

    // Set the new priority list in state
    setTabOrder(nextSelectedTabHeadings);
    // And serialize and save it to local storage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        SELECTED_TABS_LOCAL_STORAGE_KEY,
        JSON.stringify(tabOrder),
      );
    }
  };

  const value = {tabOrder, setActiveTab};
  return (
    <CodeBlockContext.Provider value={value}>
      {children}
    </CodeBlockContext.Provider>
  );
}

export function useCodeBlockContext() {
  const context = useContext(CodeBlockContext);
  return context;
}
