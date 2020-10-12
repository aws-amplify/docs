import {JsonDocsComponent, JSXBase} from "@stencil/core/internal";

export type PropType = "attr" | "slots" | "css";

export type TableGenerator = (
  docs: JsonDocsComponent,
) => JSXBase.IntrinsicElements[];
