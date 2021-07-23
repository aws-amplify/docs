// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require("../utils/slug");

const headingLinkPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");
  const idSet = new Set();

  visit(tree, "heading", (heading) => {
    const node = {...heading};
    if (node.depth !== 2 && node.depth !== 3) return;
    const data = node.data || (node.data = {});
    const props = data.hProperties || (data.hProperties = {});
    let title = "";
    for (const child of node.children) {
      title += child.value;
    }
    const id = slug(title);
    let uniqueId = id;
    let counter = 1;
    while (idSet.has(uniqueId)) {
      uniqueId = id + "-" + String(counter);
      counter++;
    }
    idSet.add(uniqueId);

    data.id = uniqueId;
    props.id = uniqueId;
    heading.children = [node];
    heading.type = "link";
    heading.url = `#${uniqueId}`;

    return visit.SKIP;
  });
};

module.exports = [headingLinkPlugin];
