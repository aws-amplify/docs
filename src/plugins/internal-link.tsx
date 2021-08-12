const internalLinkPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");

  visit(tree, "link", (link, index, parent) => {
    const {url} = link;
    const {children} = link;

    if (url.includes(":") && !url.includes("docs.amplify.aws")) {
      // external link
      parent.children.splice(
        index,
        1,
        ...[
          {
            type: "jsx",
            value: `<ExternalLink href="${url}"><a>`,
          },
          ...children,
          {
            type: "jsx",
            value: "</a></ExternalLink>",
          },
        ],
      );
    } else {
      // internal link
      parent.children.splice(
        index,
        1,
        ...[
          {
            type: "jsx",
            value: `<InternalLink href="${url}"><a>`,
          },
          ...children,
          {
            type: "jsx",
            value: "</a></InternalLink>",
          },
        ],
      );
    }
  });
};

module.exports = internalLinkPlugin;
