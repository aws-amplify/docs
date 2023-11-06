import { Flex, View, Link, Heading } from '@aws-amplify/ui-react';
export interface HeadingInterface {
  linkText: string;
  hash: string;
  level: string;
}
interface TableOfContents {
  headers?: HeadingInterface[];
}

export const TableOfContents = ({ headers }) => {
  return (
    <Flex as="nav" className="toc" aria-label="Table of contents">
      <View as="ul" className="toc-list">
        {headers.map(({ linkText, hash, level }, index) => {
          return (
            <View as="li" className="toc-item" key={`toc-${index}`}>
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
