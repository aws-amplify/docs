export enum Breakpoint {
  MOBILE = 28,
  FABLET = 36,
  TABLET = 48,
  LAPTOP = 64,
  DESKTOP = 75,
  MONITOR = 100,
}

export const createMQ = (device: number) =>
  `@media screen and (min-width: ${String(device)}rem)`;

export const createDeviceMQ = (device: Breakpoint) =>
  `@media screen and (min-width: ${String(device)}rem)`;

export const MQMobile = createDeviceMQ(Breakpoint.MOBILE);
export const MQFablet = createDeviceMQ(Breakpoint.FABLET);
export const MQTablet = createDeviceMQ(Breakpoint.TABLET);
export const MQLaptop = createDeviceMQ(Breakpoint.LAPTOP);
export const MQDesktop = createDeviceMQ(Breakpoint.DESKTOP);
export const MQMonitor = createDeviceMQ(Breakpoint.MONITOR);

export const MAX_WIDTH = "90rem";
