import {JsonDocsComponent, JSXBase} from "@stencil/core/internal";

export enum WebComponentProps {
  ATTR,
  SLOTS,
  CSS,
}

export type TableGenerator = (
  docs: JsonDocsComponent,
) => JSXBase.IntrinsicElements[];
