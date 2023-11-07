import { useNodePackageManager } from '../NodePackageManager';
import type { PropsWithChildren } from 'react';

type NodePackageManagerInlineCodeBlockProps = PropsWithChildren<{}>;

/**
 * Inline code block component to be used with MDX files
 * Use this any time you need to reference a package manager command
 */
export function NodePackageManagerInlineCodeBlock(
  props: NodePackageManagerInlineCodeBlockProps
) {
  const [nodePackageManager] = useNodePackageManager();

  return (
    <code>
      {nodePackageManager} {props.children}
    </code>
  );
}
