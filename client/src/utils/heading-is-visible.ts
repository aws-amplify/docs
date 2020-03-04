export const headingIsVisible = (element: Element): boolean => {
  const greatGrandParent = element?.parentElement?.parentElement?.parentElement;
  return greatGrandParent?.style.display !== "none";
};
