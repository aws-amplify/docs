export interface AccordionItem {
  name: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItem> = ({
  children
}: AccordionItem) => {
  return <div>{children}</div>;
};
