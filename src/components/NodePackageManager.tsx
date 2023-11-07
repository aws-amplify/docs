import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  NODE_PACKAGE_MANAGERS,
  DEFAULT_NODE_PACKAGE_MANAGER
} from '@/constants/node-package-managers';
import { LOCAL_STORAGE } from '@/constants/local-storage';
import type { PropsWithChildren } from 'react';
import type { NodePackageManager } from '@/constants/node-package-managers';

type State = NodePackageManager;
type Action = { type: 'update'; value: NodePackageManager };
type Dispatch = (action: Action) => void;

const NodePackageManagerContext = createContext<
  [state: State, dispatch: Dispatch] | undefined
>(undefined);

function nodePackageManagerReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update': {
      return action.value;
    }
    default: {
      throw new Error('Invalid NodePackageManager dispatch action type');
    }
  }
}

type NodePackageManagerProviderProps = PropsWithChildren<{}>;

/**
 * Provider for `useNodePackageManager`
 */
export function NodePackageManagerProvider(
  props: NodePackageManagerProviderProps
) {
  const [state, dispatch] = useReducer(
    nodePackageManagerReducer,
    DEFAULT_NODE_PACKAGE_MANAGER
  );

  useEffect(() => {
    // load "saved" package manager choice
    if (typeof window !== 'undefined' && window?.localStorage) {
      const saved = localStorage.getItem(LOCAL_STORAGE.NODE_PACKAGE_MANAGER);
      if (saved && NODE_PACKAGE_MANAGERS[saved]) {
        dispatch({ type: 'update', value: saved as NodePackageManager });
      }
    }
  }, []);

  useEffect(() => {
    // save package manager choice on change
    if (typeof window !== 'undefined' && window?.localStorage) {
      localStorage.setItem(LOCAL_STORAGE.NODE_PACKAGE_MANAGER, state);
    }
  }, [state]);

  return (
    <NodePackageManagerContext.Provider value={[state, dispatch]}>
      {props.children}
    </NodePackageManagerContext.Provider>
  );
}

/**
 * Use the chosen package manager
 */
export function useNodePackageManager() {
  const context = useContext(NodePackageManagerContext);
  if (context === undefined) {
    throw new Error(
      'useNodePackageManager must be used within a NodePackageManagerProvider'
    );
  }
  return context;
}
