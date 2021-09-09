const getElementTop = (element: Element, stickyBarHeight: number): number => {
  if (!element) return 0;
  return (
    element.getBoundingClientRect().top +
    pageYOffset -
    document.documentElement.clientTop -
    stickyBarHeight
  );
};

export default getElementTop;
