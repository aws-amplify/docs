import { ScrollView } from '@aws-amplify/ui-react';
import { HTMLAttributes, ReactNode } from 'react';

interface MDXTableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export const MDXTable: React.FC<MDXTableProps> = ({ children, ...props }) => {
  return (
    <ScrollView
      tabIndex={0}
      aria-label="Scrollable table"
      className="scrollview"
    >
      <table {...props}>{children}</table>
    </ScrollView>
  );
};
