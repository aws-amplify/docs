export type SelectedTabHeadings = string[];
export type SetNewSelectedTabHeadings = (tabHeading: string) => void;

export interface BlockSwitcherContext {
  selectedTabHeadings: SelectedTabHeadings;
  setNewSelectedTabHeadings: SetNewSelectedTabHeadings;
}
