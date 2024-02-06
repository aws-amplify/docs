export type ContentItemType = {
  platform: string;
  children: React.ReactNode;
};

export function ContentItem({ children }: ContentItemType) {
  return <>{children}</>;
}
