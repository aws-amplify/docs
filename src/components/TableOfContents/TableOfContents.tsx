import { useState, useEffect } from 'react';
import { Flex, View, Link, Heading } from '@aws-amplify/ui-react';
interface Heading {
  linkText: string;
  hash: string;
  level: string;
}

type Headings = Heading[];

export const TableOfContents = ({}) => {
  const [headers, setHeaders] = useState<Headings>([]);

  useEffect(() => {
    const headings: Headings = [];
    const pageHeadings = document.querySelectorAll('.main h2, .main h3');
    console.log(pageHeadings);
    pageHeadings.forEach((node) => {
      const { innerText, id, localName } = node as HTMLElement;
      if (innerText && id && (localName == 'h2' || localName == 'h3')) {
        headings.push({
          linkText: innerText,
          hash: id,
          level: localName
        });
      }
    });
    setHeaders(headings);
  }, []);

  return (
    <Flex as="nav" className="toc" aria-labelledby="tocHeader">
      {headers ? (
        <Heading level={2} id="tocHeader" className="toc-header">
          On this page
        </Heading>
      ) : (
        ''
      )}
      <View as="ul" className="toc-list">
        {headers.map(({ linkText, hash, level }) => {
          return (
            <View as="li" className="toc-item">
              <Link
                href={`#${hash}`}
                className={`toc-item__link toc-item__link--${level}`}
              >
                {linkText}
              </Link>
            </View>
          );
        })}
      </View>
    </Flex>
  );
};
