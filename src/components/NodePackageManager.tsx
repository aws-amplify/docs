import { createContext, useContext, useReducer } from 'react';
import { DEFAULT_NODE_PACKAGE_MANAGER } from '@/constants/node-package-managers';
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
