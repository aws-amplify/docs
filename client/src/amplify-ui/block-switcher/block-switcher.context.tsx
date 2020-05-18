import {createProviderConsumer} from "@stencil/state-tunnel";
import {h} from "@stencil/core";
import {BlockSwitcherContext} from "./block-switcher.types";

export const blockSwitcherContext = createProviderConsumer<
  BlockSwitcherContext
>({} as BlockSwitcherContext, (subscribe, child) => (
  <context-consumer {...{subscribe}} renderer={child} />
));
