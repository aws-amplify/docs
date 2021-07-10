const importPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");

  let addedImports = false;
  visit(tree, (_, index) => {
    if (!addedImports) {
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Layout from "/src/components/Layout";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Fragments from "/src/components/Fragments";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import CodeBlock from "/src/components/CodeBlock";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Block from "/src/components/Block";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import BlockSwitcher from "/src/components/BlockSwitcher";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import {AmplifyAuthenticator} from "@aws-amplify/ui-react";`,
      });
      addedImports = true;
    }
  });
};

module.exports = importPlugin;
