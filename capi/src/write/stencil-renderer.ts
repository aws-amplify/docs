import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

export async function stencilRenderer(config: t.Config): Promise<void> {
  await fs.ensureDir(config.outDir);
  await fs.writeFile(
    path.join(config.outDir, "stencil-renderer.ts"),
    `/**
 * This file exports the Hyperscript type, along with utilities for
 * rendering Stencil-specific VNodes from a Hyperscript node(s).
 */
    
import {h} from "@stencil/core";
import {VNode} from "@stencil/core";
import {OrText, HyperscriptNode, Props} from "./types";

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
    return createVNode(tag, props, ...(childVNodes || []));
  }
  return node;
};

export const createVNodesFromHyperscriptNodes = (
  nodes?: HyperscriptNode[],
): HyperscriptResult[] | undefined =>
  nodes && nodes.map(createVNodeFromHyperscriptNode);

`,
    {
      encoding: "utf8",
    },
  );
}
