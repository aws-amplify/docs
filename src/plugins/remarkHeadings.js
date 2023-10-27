module.exports = (async () => {
  const { visit } = await import('unist-util-visit');
  const { toString } = await import('mdast-util-to-string');
  // const hasHeadingsData = (data) =>
  //   data instanceof Object &&
  //   data.hasOwnProperty('headings') &&
  //   // @ts-expect-error
  //   data.headings instanceof Array;

  const headings = (root) => {
    const headingList = [];

    visit(root, 'heading', (node) => {
      const heading = {
        depth: node.depth,
        value: toString(node, { includeImageAlt: false })
      };

      const data = node?.data;
      if (data) {
        heading.data = data;
      }

      headingList.push(heading);
    });

    return headingList;
  };

  const remarkHeadingsPlugin = () => {
    return (node, file) => {
      file.data.headings = headings(node);
      console.log('file.data.headings: ', file.data.headings);
    };
  };

  return remarkHeadingsPlugin;
})();
