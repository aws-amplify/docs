import { useState, useEffect } from 'react';
import { View, Link } from '@aws-amplify/ui-react';

export const TableOfContents = ({}) => {
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    const headings = [];
    const pageHeadings = document.querySelectorAll('.main h2, .main h3');
    console.log(pageHeadings);
  }, [headers]);

  return <div></div>;
};
