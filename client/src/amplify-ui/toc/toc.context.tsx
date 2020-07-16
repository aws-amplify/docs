import {createProviderConsumer} from "@stencil/state-tunnel";
import {h} from "@stencil/core";
import {TOCContext} from "./toc.types";

export const tocContext = createProviderConsumer<TOCContext>(
  {},
  (subscribe, child) => <context-consumer {...{subscribe}} renderer={child} />,
);
