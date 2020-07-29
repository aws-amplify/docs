import {h, VNode} from "@stencil/core";

export type Props = null | Record<string, unknown>;
export type OrText<T> = T | string | number;
export type HyperscriptNode = OrText<[string, Props, ...HyperscriptNode[]]>;
export type HyperscriptResult = OrText<VNode>;

type CreateVNodeArgs = [string, Props, ...HyperscriptResult[]];
export const createVNode = (h as any) as (
  ..._0: CreateVNodeArgs
) => HyperscriptResult;

export const createVNodeFromHyperscriptNode = (
  node: HyperscriptNode,
): HyperscriptResult => {
  if (Array.isArray(node)) {
    const [tag, props, ...childHyperscriptNodes] = node;
    const childVNodes = createVNodesFromHyperscriptNodes(childHyperscriptNodes);
    return createVNode(tag, props, ...childVNodes);
  }
  return node;
};

export const createVNodesFromHyperscriptNodes = (
  nodes: HyperscriptNode[],
): HyperscriptResult[] => nodes && nodes.map(createVNodeFromHyperscriptNode);
