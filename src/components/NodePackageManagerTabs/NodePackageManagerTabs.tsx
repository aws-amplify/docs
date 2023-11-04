import { useState, useEffect } from 'react';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import { MDXCode } from '@/components/MDXComponents';
import { NODE_PACKAGE_MANAGERS } from '@/constants/node-package-managers';
import { useNodePackageManager } from '../NodePackageManager';
import type { PropsWithChildren } from 'react';
import type { NodePackageManager } from '@/constants/node-package-managers';

export type NodePackageManagerTabsProps = Record<NodePackageManager, string>;

/**
 * Wrapped CodeBlock "command"
 */
function Command({ children }: PropsWithChildren<{}>) {
  return (
    <MDXCode
      codeString={children!.toString()}
      fileName=""
      showLineNumbers={false}
      language="bash"
    />
  );
}

/**
 * Tabs for each (known) Node Package Manager
 * Use this for when you need to author content including commands for each package manager
 */
export function NodePackageManagerTabs(props: NodePackageManagerTabsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nodePackageManager, dispatch] = useNodePackageManager();
  const packageManagers = Object.entries(NODE_PACKAGE_MANAGERS);
  const defaultIndex = packageManagers.findIndex(
    ([key]) => key === nodePackageManager
  );

  /**
   * Handle tab change. This updates the NodePackageManager context, which updates all other instances of `NodePackageManagerTabs`
   */
  function handleOnChange(value: string | number) {
    let index: number;
    if (typeof value === 'string') {
      index = parseInt(value, 10);
    } else {
      index = value;
    }
    dispatch({ type: 'update', value: packageManagers[index][1] });
  }

  useEffect(() => {
    // update the currentIndex when context changes
    setCurrentIndex(
      Object.values(NODE_PACKAGE_MANAGERS).findIndex(
        (pm) => pm === nodePackageManager
      )
    );
  }, [nodePackageManager]);

  return (
    <Tabs
      defaultIndex={defaultIndex}
      currentIndex={currentIndex}
      onChange={handleOnChange}
    >
      {packageManagers.map(([packageManager, packageManagerDisplayName]) => (
        <TabItem key={packageManager} title={packageManagerDisplayName}>
          <Command>{props[packageManager]}</Command>
        </TabItem>
      ))}
    </Tabs>
  );
}
