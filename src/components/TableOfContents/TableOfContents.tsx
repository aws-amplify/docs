import { Flex, View, Link, Heading } from '@aws-amplify/ui-react';
import { IconTOC } from '@/components/Icons';
import { useContext } from 'react';
import { LayoutContext } from '../Layout';
export interface HeadingInterface {
  linkText: string;
  hash: string;
  level: string;
}
interface TableOfContents {
  headers?: HeadingInterface[];
  forDesktop?: boolean;
}

export const TableOfContents = ({ headers, forDesktop }) => {
  const { tocOpen, toggleTocOpen } = useContext(LayoutContext);

  const onLinkClick = () => {
    if (tocOpen) {
      // Close the menu after clicking a link (applies to the mobile menu)
      toggleTocOpen(false);
    }
  };

  const hideOnMobile = forDesktop ? 'desktop-toc' : '';

  return (
    <Flex
      as="nav"
      className={`toc ${hideOnMobile}`}
      aria-labelledby="tocHeader"
    >
      {headers ? (
        <Heading level={2} id="tocHeader" className="toc-header">
          <IconTOC /> On this page
        </Heading>
      ) : (
        ''
      )}
      <View as="ul" className="toc-list">
        {headers.map(({ linkText, hash, level }, index) => {
          return (
            <View
              as="li"
              className={`toc-item toc-item--${level}`}
              key={`toc-${index}`}
            >
              <Link
                href={`#${hash}`}
                className={`toc-item__link toc-item__link--${level}`}
                onClick={onLinkClick}
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
