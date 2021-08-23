import directory from "../directory/directory";

function getLocalDirectory(pathname: string, depth: number): object {
  const path = pathname.split("/");

  let localDirectory = {items: directory};
  for (let i = 1; i <= depth; ++i) {
    localDirectory = localDirectory.items[path[i]];
  }
  return localDirectory;
}

export function isProductRoot(pathname: string): boolean {
  const path = pathname.split("/");

  if (directory[path[1]].productRoot.route === pathname) {
    // matches /ui, for example
    return true;
  }
  if (path[2] === "q") {
    // matches /ui/q/framework/react, for example
    return true;
  }
  return false;
}

export function getProductDirectory(pathname: string): object {
  return getLocalDirectory(pathname, 1);
}

export function getChapterDirectory(pathname: string): object {
  return getLocalDirectory(pathname, 2);
}
