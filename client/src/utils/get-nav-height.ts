import {Breakpoint} from "../amplify-ui/styles/media";

export const getNavHeight = (rems?: boolean) => {
  const value = innerWidth > Breakpoint.LAPTOP * 16 ? 3 : 6.25;
  return rems ? value : value * 16;
};
