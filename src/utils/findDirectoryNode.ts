import directory from '@/directory/directory.json';

export const findDirectoryNode = (route, dir = directory) => {
  if (dir.route === route) {
    return dir;
  } else if (dir.children && dir.children.length) {
    for (let i = 0; i < dir.children.length; i++) {
      const child = dir.children[i];
      const res = findDirectoryNode(route, child);
      if (res) return res;
    }
  }
};
