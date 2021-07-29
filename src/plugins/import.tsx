const importPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require("unist-util-visit");

  let addedImports = false;
  visit(tree, (_, index) => {
    if (!addedImports) {
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Page from "/src/components/Page";`,
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
        value: `import Callout from "/src/components/Callout";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import {Card, CardDetail, CardGraphic} from "/src/components/Card";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import InternalLink from "/src/components/InternalLink";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import InternalLinkButton from "/src/components/InternalLinkButton";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Hero from "/src/components/Hero";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Footer from "/src/components/Footer";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import Container from "/src/components/Container";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import {AmplifyAuthenticator} from "@aws-amplify/ui-react";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import {Grid} from "theme-ui";`,
      });
      tree.children.splice(index + 1, 0, {
        type: "import",
        value: `import UiComponentProps from "/src/components/UiComponentProps";`,
      });
      addedImports = true;
    }
  });
};

module.exports = importPlugin;
