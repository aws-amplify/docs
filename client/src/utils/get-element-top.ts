export const getElementTop = (
  element: Element,
  stickyBarHeight: number,
): number => {
  return (
    element.getBoundingClientRect().top +
    pageYOffset -
    document.documentElement.clientTop -
    stickyBarHeight
  );
};
