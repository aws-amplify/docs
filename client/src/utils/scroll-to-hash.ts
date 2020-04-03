import {headingIsVisible} from "./heading-is-visible";
import {getElementTop} from "./get-element-top";
import {getNavHeight} from "./get-nav-height";

export const scrollToHash = (hash: string): void => {
  const targets = Array.from(document.querySelectorAll(hash)).filter((e) =>
    headingIsVisible(e),
  ) as HTMLElement[];
  if (targets[0]) {
    const top = getElementTop(targets[0], getNavHeight());
    scrollTo({top, behavior: "smooth"});
  }
};
