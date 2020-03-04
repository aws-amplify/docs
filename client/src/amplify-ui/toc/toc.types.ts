export type SetContent = (content: HTMLElement) => void;

export interface TOCContext {
  elements?: HTMLElement[];
  setContent?: SetContent;
}
