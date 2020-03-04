import {HyperscriptNode} from "./hyperscript-node";
import {Ctx} from "./ctx";
import {Config} from "./config";
import {Page} from "./page";
import traverse from "traverse";

export interface TransformerProps {
  node: HyperscriptNode;
  srcPath: string;
  lexicalScope: traverse.TraverseContext;
  ctx: Ctx;
  page: Page;
  config: Config;
}

export type Transformer = (props: TransformerProps) => void;
