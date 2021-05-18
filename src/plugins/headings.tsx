// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require("../utils/slug");

const headingLinkPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");

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

module.exports = [headingLinkPlugin];
