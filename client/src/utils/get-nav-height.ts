import {Breakpoint} from "../amplify-ui/styles/media";

let cachedAt = window.innerWidth;
let cachedPxResult: number | undefined;
let cachedRemsResult: number | undefined;

export const getNavHeight = (rems?: boolean): number => {
  if (cachedAt === innerWidth) {
    if (rems && cachedRemsResult) {
      return cachedRemsResult;
    } else if (cachedPxResult) {
      return cachedPxResult;
    }
  }

  const nav = document.getElementById("secondary-nav");

  if (nav) {
    cachedAt = innerWidth;
    cachedPxResult = parseInt(getComputedStyle(nav).height);
    cachedRemsResult = cachedPxResult / 16;
    return rems ? cachedRemsResult : cachedPxResult;
  }

  // fallback
  const value = innerWidth > Breakpoint.LAPTOP * 16 ? 3 : 6.25;
  return rems ? value : value * 16;
};
