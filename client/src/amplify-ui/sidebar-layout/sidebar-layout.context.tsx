import {createProviderConsumer} from "@stencil/state-tunnel";
import {h} from "@stencil/core";
import {SidebarLayoutContext} from "./sidebar-layout.types";

export const sidebarLayoutContext = createProviderConsumer<
  SidebarLayoutContext
>({}, (subscribe, child) => (
  <context-consumer {...{subscribe}} renderer={child} />
));
