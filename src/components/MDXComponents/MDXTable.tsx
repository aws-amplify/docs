import { ScrollView } from '@aws-amplify/ui-react';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

interface MDXTableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export const MDXTable: React.FC<MDXTableProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLTableElement>(null);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    const getHeading = (el) => {
      if (el?.previousElementSibling?.tagName.startsWith('H')) {
        setCaption(el.previousElementSibling.textContent);
      } else {
        getHeading(ref.current?.previousElementSibling);
      }
    };
    getHeading(ref.current);
  }, []);

  const tableId = caption.includes(' ') ? caption.split(' ').join('') : caption;

  return (
    <ScrollView
      tabIndex={0}
      aria-label="Scrollable table"
      aria-labelledby={'table:' + tableId}
      className="scrollview"
      role="region"
      ref={ref}
    >
      <table {...props}>
        <caption id={'table:' + tableId}>Table: {caption}</caption>
        {children}
      </table>
    </ScrollView>
  );
};
