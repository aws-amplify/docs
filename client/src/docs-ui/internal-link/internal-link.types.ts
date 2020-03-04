export type SetCurrentPath = (route: string) => void;

export interface InternalLinkContext {
  currentPath?: string;
  setCurrentPath?: SetCurrentPath;
}
