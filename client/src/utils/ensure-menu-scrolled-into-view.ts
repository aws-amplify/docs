import {Breakpoint} from "../amplify-ui/styles/media";

export const ensureMenuScrolledIntoView = (): void => {
  const footer = document.querySelector("docs-footer");
  if (footer && innerWidth <= Breakpoint.TABLET * 16) {
    const documentHeight = document.body.getBoundingClientRect().height;
    const footerHeight = footer.getBoundingClientRect().height;
    if (footerHeight && documentHeight) {
      const checkHeight = documentHeight - innerHeight - footerHeight;
      if (scrollY > checkHeight) {
        const targetOffsetTop = documentHeight - (footerHeight + innerHeight);
        scrollTo({top: targetOffsetTop});
      }
    }
  }
};
