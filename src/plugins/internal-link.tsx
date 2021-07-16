const internalLinkPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");

  visit(tree, "link", (link, index, parent) => {
    const {url} = link;
    if (url.includes(":") && !url.includes("docs.amplify.aws")) {
      // external link
      return;
    }
    const children = link.children;

    parent.children.splice(
      index,
      1,
      ...[
        {
          type: "jsx",
          value: `<InternalLink href="${url}">`,
        },
        ...children,
        {
          type: "jsx",
          value: "</InternalLink>",
        },
      ],
    );
  });
};

module.exports = internalLinkPlugin;
