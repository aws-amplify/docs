import { visit } from 'unist-util-visit';
import JSON5 from 'json5';
import { getLastModifiedDate } from 'git-jiggy';
import * as babel from '@babel/core';
import generate from '@babel/generator';

export function frontmatterPlugin() {
  return (tree, file) => {
    // Goes through the markdown tree and builds the frontmatter
    visit(tree, 'mdxjsEsm', async (node, index, tree) => {
      if (node.value.indexOf('export const meta') === 0) {
        const ast = babel.parse(node.value, { sourceType: 'module' });
        const programAst = ast.program;

        const lastUpdated = await getLastModifiedDate(file.path);
        // const linehere = 'test';

        const whats = 'hi';

        babel.traverse(programAst, {
          ObjectExpression(path) {
            path.node.properties.push(
              babel.types.objectProperty(
                babel.types.identifier('lastUpdated'),
                babel.types.stringLiteral(lastUpdated)
              )
            );
          }
        });

        const output = generate.default(ast).code;
        node.value = output;
        node.data = node.data || {};
        node.data.estree = programAst;

        console.log('from plugin nodevalue', node.value);
      }
    });
  };
}
