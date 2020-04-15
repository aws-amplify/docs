import {Breakpoint} from "../amplify-ui/styles/media";

export const ensureMenuScrolledIntoView = (): void => {
  const footer = document.querySelector("docs-footer");
  const documentHeight = document.body.getBoundingClientRect().height;
  if (footer && innerWidth <= Breakpoint.TABLET * 16) {
    const footerHeight = footer.getBoundingClientRect().height;
    if (scrollY > documentHeight - innerHeight - footerHeight) {
      if (scrollY > documentHeight - innerHeight - footerHeight) {
        const targetOffsetTop = documentHeight - (footerHeight + innerHeight);
        scrollTo({top: targetOffsetTop});
      }
    }
  }
};
