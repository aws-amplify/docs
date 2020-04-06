import {headingIsVisible} from "./heading-is-visible";
import {getElementTop} from "./get-element-top";
import {getNavHeight} from "./get-nav-height";

export const scrollToHash = (hash: string, scope: HTMLElement): void => {
  const targets = Array.from(scope.querySelectorAll(hash)).filter((e) =>
    headingIsVisible(e),
  ) as HTMLElement[];
  if (targets[0]) {
    const top = getElementTop(targets[0], getNavHeight("px"));
    scrollTo({top, behavior: "smooth"});
  }
};
