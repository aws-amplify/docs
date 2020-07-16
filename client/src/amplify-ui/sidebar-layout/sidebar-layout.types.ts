export type ToggleInView = () => void;

export interface SidebarLayoutContext {
  inView?: boolean;
  toggleInView?: ToggleInView;
}
