import directory from '../directory/directory.json';
import { PageNode } from 'src/directory/directory';

export const getChildPageNodes = (route) => {
  return traverseDirectory(route, directory as PageNode);
};

function traverseDirectory(route: string, node: PageNode) {
  if (node.route === route) {
    return node.children;
  }

  if (node.children) {
    for (const childNode of node.children) {
      const foundNode = traverseDirectory(route, childNode);

      if (foundNode) {
        return foundNode;
      }
    }
  }
}
