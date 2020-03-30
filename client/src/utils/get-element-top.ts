export const getElementTop = (
  element: Element,
  stickyBarTop: number,
): number => {
  return (
    element.getBoundingClientRect().top +
    pageYOffset -
    document.documentElement.clientTop -
    stickyBarTop
  );
};
