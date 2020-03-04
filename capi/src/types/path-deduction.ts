export interface PathDeduction {
  isMenu: boolean;
  srcPath: string;
  grandParentDir: string;
  folderName: string;
  fileName: string;
  extension: string;
  route?: string;
  uri?: string;
  destinationPath?: string;
  relativeToContentDir: string;
}

export type ResolvePathDeduction = (
  reference: string,
  relativeTo: string,
  assetType?: "page" | "fragment" | "image",
) => PathDeduction;
