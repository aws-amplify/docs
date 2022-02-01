import {createContext, useContext, useState} from "react";
import {parseLocalStorage} from "../../utils/parseLocalStorage";

const CodeBlockContext = createContext({
  tabOrder: [],
  setActiveTab: (_1, _2?) => {
    return;
  },
  setFromLocalStorage: () => {
    return;
  },
});

const TAB_ORDER_LOCAL_STORAGE_KEY = `amplify-docs::tab-order`;

export default function CodeBlockProvider({children}) {
  const [tabOrder, setTabOrder] = useState([]);

  const setFromLocalStorage = () => {
    setTabOrder((oldTabOrder) => {
      const localStorageTabOrder = parseLocalStorage(
        TAB_ORDER_LOCAL_STORAGE_KEY,
        [],
      );
      const newTabOrder = [];
      // First add the state from local storage
      for (const tabName of localStorageTabOrder) {
        if (!newTabOrder.includes(tabName)) {
          newTabOrder.push(tabName);
        }
      }
      // If we had any state loaded already, put it at the end
      for (const tabName of oldTabOrder) {
        if (!newTabOrder.includes(tabName)) {
          newTabOrder.push(tabName);
        }
      }
      return newTabOrder;
    });
  };

  const setActiveTab = (tabName, saveToLocalStorage = true) => {
    setTabOrder((oldTabOrder) => {
      // Break out early to avoid rerendering if the currently active tab is clicked
      if (tabName === oldTabOrder[0]) return oldTabOrder;
      // Create temp array with `tabHeading` (the new highest priority) as the first element
      const newTabOrder = new Array<string>();
      newTabOrder.push(tabName);

      // Iterate through previous `selectedTabHeadings`
      oldTabOrder.forEach((e) => {
        // No repeats allowed!
        if (tabName !== e) {
          // Ensure preexisting tab name priorities are preserved
          newTabOrder.push(e);
        }
      });

      // Serialize and save to local storage
      if (typeof localStorage !== "undefined" && saveToLocalStorage) {
        localStorage.setItem(
          TAB_ORDER_LOCAL_STORAGE_KEY,
          JSON.stringify(newTabOrder),
        );
      }

      // And return the new priority list to set it in state
      return newTabOrder;
    });
  };

  const value = {tabOrder, setActiveTab, setFromLocalStorage};
  return (
    <CodeBlockContext.Provider value={value}>
      {children}
    </CodeBlockContext.Provider>
  );
}

export function useCodeBlockContext() {
  const context = useContext(CodeBlockContext);

  if (!context) {
    throw new Error(`'useCodeBlockContext' should be used within a 'CodeBlockProvider'`)
  }

  return context;
}
