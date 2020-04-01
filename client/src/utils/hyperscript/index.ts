import {h} from "@stencil/core";
import {VNode} from "@stencil/core";
import {isHTMLTagName} from "is-html-tag-name";

export type Props = null | Record<string, unknown>;
export type OrText<T> = T | string | number;
export type HyperscriptNode = OrText<[string, Props, ...HyperscriptNode[]]>;
export type HyperscriptResult = OrText<VNode>;

export const validateTagName = (inQuestion: string) =>
  !isHTMLTagName(inQuestion) &&
  inQuestion.split("-").length < 2 &&
  console.error(`Invalid tag name: "${inQuestion}"`);

type CreateVNodeArgs = [string, Props, ...HyperscriptResult[]];
export const createVNode = (h as any) as (
  ..._0: CreateVNodeArgs
) => HyperscriptResult;

export const createVNodeFromHyperscriptNode = (
  node: HyperscriptNode,
): HyperscriptResult => {
  if (Array.isArray(node)) {
    const [tag, props, ...childHyperscriptNodes] = node;
    validateTagName(tag);
    const childVNodes = createVNodesFromHyperscriptNodes(childHyperscriptNodes);
    return createVNode(tag, props, ...childVNodes);
  }
  return node;
};

export const createVNodesFromHyperscriptNodes = (
  nodes: HyperscriptNode[],
): HyperscriptResult[] => nodes && nodes.map(createVNodeFromHyperscriptNode);
