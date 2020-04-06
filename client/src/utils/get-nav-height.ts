import {Breakpoint} from "../amplify-ui/styles/media";

let cachedAt = window.innerWidth;
let cachedPxResult: number | undefined;
let cachedRemsResult: number | undefined;

export const getNavHeight = (unit: "rem" | "px"): number => {
  if (cachedAt === innerWidth) {
    switch (unit) {
      case "rem": {
        if (cachedRemsResult) {
          return cachedRemsResult;
        }
        break;
      }
      case "px": {
        if (cachedPxResult) {
          return cachedPxResult;
        }
        break;
      }
    }
  }

  const nav = document.getElementById("secondary-nav");

  if (nav) {
    cachedAt = innerWidth;
    cachedPxResult = parseInt(getComputedStyle(nav).height);
    cachedRemsResult = cachedPxResult / 16;

    switch (unit) {
      case "rem": {
        return cachedRemsResult;
      }
      case "px": {
        return cachedPxResult;
      }
    }
  }

  // fallback
  const value = innerWidth > Breakpoint.LAPTOP * 16 ? 3 : 6.25;

  switch (unit) {
    case "rem": {
      return value / 16;
    }
    case "px": {
      return value;
    }
  }
};
