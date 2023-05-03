module.exports = (async () => {
  const { visit } = await import('unist-util-visit');

  const createImport = (importName, importPath) => {
    return {
      type: 'mdxjsEsm',
      value: `import ${importName} from "${importPath}"`,
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              source: {
                type: 'Literal',
                value: importPath
              },
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: {
                    type: 'Identifier',
                    name: importName
                  }
                }
              ]
            }
          ]
        }
      }
    };
  };

  const allImports = [
    {
      importName: 'Fragments',
      importPath: '/src/components/Fragments'
    },
    {
      importName: 'InternalLinkButton',
      importPath: '/src/components/InternalLinkButton'
    },
    {
      importName: 'ExternalLink',
      importPath: '/src/components/ExternalLink'
    },
    {
      importName: 'Hydrate',
      importPath: '/src/components/Hydrate'
    }
  ];

  const importPlugin = () => (tree) => {
    let addedImports = false;
    visit(tree, (_, index) => {
      if (!addedImports) {
        tree.children.unshift(
          ...allImports.map((importSpec) =>
            createImport(importSpec.importName, importSpec.importPath)
          )
        );
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Page from "/src/components/Page";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Fragments from "/src/components/Fragments";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import FilterContent from "/src/components/FilterContent";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import CodeBlock from "/src/components/CodeBlock";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Block from "/src/components/Block";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import BlockSwitcher from "/src/components/BlockSwitcher";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Callout from "/src/components/Callout";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import {Card, CardDetail, CardGraphic} from "/src/components/Card";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import ExternalLink from "/src/components/ExternalLink";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import InternalLink from "/src/components/InternalLink";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import InternalLinkButton from "/src/components/InternalLinkButton";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Hero from "/src/components/Hero";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Footer from "/src/components/Footer";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import Container from "/src/components/Container";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import FeatureFlags from "/src/components/FeatureFlags";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import {Grid} from "theme-ui";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import UiComponentProps from "/src/components/UiComponentProps";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import MigrationAlert from "/src/components/MigrationAlert";`
        // });
        // tree.children.splice(index + 1, 0, {
        //   type: 'import',
        //   value: `import { annotations, Code, Scrollycoding } from "@code-hike/mdx/dist/components.cjs.js"`
        // });
        addedImports = true;
      }
    });
  };

  return importPlugin;
})();
