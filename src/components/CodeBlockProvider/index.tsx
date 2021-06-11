import {createContext, useContext, useState} from "react";

const CodeBlockContext = createContext({
  tabOrder: [],
  setActiveTab: (_) => {
    return;
  },
});

export default function CodeBlockProvider(children) {
  const [tabOrder, setTabOrder] = useState([]);
  const setActiveTab = function(tabName) {
    // Break out early to avoid rerendering if the currently active tab is clicked
    if (tabName === this.tabOrder[0]) return;
    // Create temp array with `tabHeading` (the new highest priority) as the first element
    const nextSelectedTabHeadings = new Array<string>();
    nextSelectedTabHeadings.push(tabName);

    // Iterate through previous `selectedTabHeadings`
    this.tabOrder.forEach((e) => {
      // No repeats allowed!
      if (tabName !== e) {
        // Ensure preexisting tab name priorities are preserved
        nextSelectedTabHeadings.push(e);
      }
    });

    // Set the new priority list in state
    setTabOrder(nextSelectedTabHeadings);
  };
  const value = {tabOrder, setActiveTab};
  return (
    <CodeBlockContext.Provider value={value}>
      {children.children}
    </CodeBlockContext.Provider>
  );
}

export function useCodeBlockContext() {
  const context = useContext(CodeBlockContext);
  return context;
}
