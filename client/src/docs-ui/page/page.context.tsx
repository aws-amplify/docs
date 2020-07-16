import {createProviderConsumer} from "@stencil/state-tunnel";
import {h} from "@stencil/core";
import {PageContext} from "./page.types";

export const pageContext = createProviderConsumer<PageContext>(
  {} as PageContext,
  (subscribe, child) => <context-consumer {...{subscribe}} renderer={child} />,
);
