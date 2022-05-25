import { createContext, useContext, useState } from 'react';

const LastUpdatedDatesContext = createContext({
  updateLastUpdatedDate: (date) => {}
});

export default function LastUpdatedDatesProvider({ updateLastUpdatedDate, children }) {
  const value = {updateLastUpdatedDate}

  return (
    <LastUpdatedDatesContext.Provider value={value}>
      {children}
    </LastUpdatedDatesContext.Provider>
  );
}

export function useLastUpdatedDatesContext() {
  const context = useContext(LastUpdatedDatesContext);
  if (!context) {
    console.error(
      'useLastUpdatedDatesContext must be used within a LastUpdatedDatesProvider'
    );
    return;
  }

  return context;
}
