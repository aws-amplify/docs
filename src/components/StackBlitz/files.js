/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
import chalk from 'chalk';

console.log(chalk.green('Hello World'));
`
    }
  },
  'package.json': {
    file: {
      contents: `
          {
            "name": "example-app",
            "type": "module",
            "dependencies": {
              "chalk": "latest"
            },
            "scripts": {
              "start": "index.js"
            }
          }`
    }
  }
};
