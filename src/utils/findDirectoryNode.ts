import directory from '@/directory/directory.json';
import { PageNode } from '@/directory/directory';

const directoryCast = directory as PageNode;

export const findDirectoryNode = (
  route: string,
  dir = directoryCast
): PageNode | null => {
  if (dir.route === route) {
    return dir;
  } else if (dir.children && dir.children.length) {
    for (let i = 0; i < dir.children.length; i++) {
      const child = dir.children[i];
      const res = findDirectoryNode(route, child);
      if (res) return res;
    }
  }

  return null;
};

export const findDirectoryNodes = (
  predicate: (path: string) => boolean,
  dir = directoryCast
): PageNodes[] => {
  if (!dir.path) {
    return [];
  }
  let result = [];
  if (predicate(dir.path)) {
    result = [dir];
  }
  if (dir.children && dir.children.length) {
    for (const child of dir.children) {
      result = [...result, ...findDirectoryNodes(predicate, child)];
    }
  }
  return result;
};
