import { createContext, useContext, useReducer } from 'react';

type PageLastUpdatedDatesType = {
  parentPageLastUpdatedDate: string;
};

type PageLastUpdatedState = {
  files: PageLastUpdatedDatesType;
};

const pageLastUpdatedReducer = (
  state: PageLastUpdatedState,
  action: { type: string; key: string; lastUpdated: string }
) => {
  switch (action.type) {
    case 'update': {
      if (!Object.prototype.hasOwnProperty.call(state.files, action.key)) {
        state.files[action.key] = [];
        state.files[action.key].push(action.lastUpdated);
      } else if (!state.files[action.key].includes(action.lastUpdated)) {
        state.files[action.key].push(action.lastUpdated);
      }

      return {
        ...state
      };
    }
    default:
      return state;
  }
};

type LastUpdatedDatesContextType = {
  state: PageLastUpdatedState;
  dispatch: any;
};

const LastUpdatedDatesContext = createContext<LastUpdatedDatesContextType>({
  state: { files: { parentPageLastUpdatedDate: '' } },
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
