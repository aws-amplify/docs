import { Flex, View, Link, Heading } from '@aws-amplify/ui-react';
import { IconTOC } from '@/components/Icons';
export interface HeadingInterface {
  linkText: string;
  hash: string;
  level: string;
  subheadings: Array<object>;
}
interface TableOfContents {
  headers?: HeadingInterface[];
}

export const TableOfContents = ({ headers }) => {
  return (
    <Flex as="nav" className="toc" aria-labelledby="tocHeader">
      {headers ? (
        <Heading level={2} id="tocHeader" className="toc-header">
          <IconTOC /> On this page
        </Heading>
      ) : (
        ''
      )}
      <View as="ul" className="toc-list">
        {headers.map(({ linkText, hash, level }, index) => {
          if (headers[index].subheadings?.length === 0) {
            return (
              <View
                as="li"
                className={`toc-item toc-item--${level}`}
                key={`toc-${index}`}
              >
                <Link
                  href={`#${hash}`}
                  className={`toc-item__link toc-item__link--${level}`}
                >
                  {linkText}
                </Link>
              </View>
            );
          } else {
            return (
              <View
                as="li"
                className={`toc-item toc-item--${level}`}
                key={`toc-${index}`}
              >
                <Link
                  href={`#${hash}`}
                  className={`toc-item__link toc-item__link--${level}`}
                >
                  {linkText}
                </Link>
                <View as="ul" className="toc-list">
                  {headers[index].subheadings?.map(
                    ({ linkText, hash, level }, index) => {
                      return (
                        <View
                          as="li"
                          className={`toc-item toc-item--${level}`}
                          key={`toc-${index}`}
                        >
                          <Link
                            href={`#${hash}`}
                            className={`toc-item__link toc-item__link--${level}`}
                          >
                            {linkText}
                          </Link>
                        </View>
                      );
                    }
                  )}
                </View>
              </View>
            );
          }
        })}
      </View>
    </Flex>
  );
};
