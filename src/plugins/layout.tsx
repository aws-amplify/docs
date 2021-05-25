const layoutPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");
  visit(tree, "export", (node, index) => {
    if (node.value.includes("export const meta")) {
      tree.children.splice(index + 1, 0, {
        type: "export",
        default: true,
        value:
          "export default ({ children }) => <Layout meta={meta}>{children}</Layout>",
      });
    }
  });
};

module.exports = [layoutPlugin];
