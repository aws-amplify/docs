import {JsonDocsComponent, JSXBase} from "@stencil/core/internal";

export enum WebComponentProps {
  ATTR = "attr",
  SLOTS = "slots",
  CSS = "css",
}

export type TableGenerator = (
  docs: JsonDocsComponent,
) => JSXBase.IntrinsicElements[];
