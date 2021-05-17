const headingLinkPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");
  const slug = function(str) {
    let slugged = "";
    for (const c of str) {
      if (c >= "A" && c <= "z") {
        slugged += c.toLowerCase();
      } else if (c >= "0" && c <= "9") {
        slugged += c;
      } else if (c === " " || c === "-") {
        slugged += "-";
      }
    }
    return slugged;
  };

  visit(tree, "heading", (heading) => {
    const node = {...heading};
    const data = node.data || (node.data = {});
    const props = data.hProperties || (data.hProperties = {});
    const id = slug(node.children[0].value);
    data.id = id;
    props.id = id;
    heading.children = [node];
    heading.type = "link";
    heading.url = `#${id}`;

    return visit.SKIP;
  });
};

const layoutPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");
  visit(tree, "export", (node, index) => {
    if (node.value.includes("export const meta")) {
      tree.children.splice(index + 1, 0, {
        type: "export",
        default: true,
        value: `export default ({ children }) => <Layout meta={meta}>{children}</Layout>`,
      });
    }
  });
};

module.exports = [headingLinkPlugin, layoutPlugin];
