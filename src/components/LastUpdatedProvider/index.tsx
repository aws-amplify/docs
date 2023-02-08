import { createContext, useContext, useReducer } from 'react';

export const ACTIONS = {};

const pageLastUpdatedReducer = (
  state,
  action: { type: string; key: string; filePath: string; lastUpdated: string }
) => {
  switch (action.type) {
    case 'update': {
      const value = `${action.filePath}____${action.lastUpdated}`;

      if (!state.files.hasOwnProperty(action.key)) {
        state.files[action.key] = [];
        state.files[action.key].push(value);
      } else if (!state.files[action.key].includes(value)) {
        state.files[action.key].push(value);
      }

      return {
        ...state
      };
    }
    case 'clear': {
      console.log('clear');
      return state;
    }
    default:
      return state;
  }
};

type LastUpdatedDatesContextType = {
  state: { files: any };
  dispatch: any;
};

const LastUpdatedDatesContext = createContext<LastUpdatedDatesContextType>({
  state: { files: {} },
  dispatch: (action: any) => {
    /** no-op */
  }
});

export default function LastUpdatedDatesProvider({
  children,
  parentPageLastUpdatedDate
}) {
  const [state, dispatch] = useReducer(pageLastUpdatedReducer, {
    files: { parentPageLastUpdatedDate: parentPageLastUpdatedDate }
  });

  return (
    <LastUpdatedDatesContext.Provider value={{ state, dispatch }}>
      {children}
    </LastUpdatedDatesContext.Provider>
  );
}

export function useLastUpdatedDatesContext() {
  const context = useContext(LastUpdatedDatesContext);
  if (!context) {
    throw new Error(
      'useLastUpdatedDatesContext must be used within a LastUpdatedDatesProvider'
    );
  }

  return context;
}
