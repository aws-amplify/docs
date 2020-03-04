import {createProviderConsumer} from "@stencil/state-tunnel";
import {h} from "@stencil/core";
import {InternalLinkContext} from "./internal-link.types";

export const internalLinkContext = createProviderConsumer<InternalLinkContext>(
  {},
  (subscribe, child) => <context-consumer {...{subscribe}} renderer={child} />,
);
