const descendsFromDisplayNone = (element: Element): boolean => {
  if (!element?.parentElement) return false;
  if (element.parentElement.tagName === "AMPLIFY-TOC-CONTENTS") return false;
  return !!(
    element.parentElement.style.display === "none" ||
    descendsFromDisplayNone(element.parentElement)
  );
};

export const headingIsVisible = (element: Element): boolean => {
  return !descendsFromDisplayNone(element);
};
