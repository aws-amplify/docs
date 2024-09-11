import { useEffect, useRef, Fragment } from 'react';
import { Text, Flex } from '@aws-amplify/ui-react';

import { TypeLink, TypeLinkInterface } from './TypeLink';

interface ApiModalBreadcrumbs {
  items?: TypeLinkInterface[];
}

export const ApiModalBreadcrumbs = ({ items }: ApiModalBreadcrumbs) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.scrollLeft = navRef.current.scrollWidth;
    }
  }, [items]);

  return (
    <Flex
      as="nav"
      ref={navRef}
      aria-label="API Type breadcrumbs"
      className="api-modal__breadcrumbs"
      tabIndex={items && items.length > 1 ? 0 : -1}
    >
      {items
        ? items.map((item, index) => {
            return (
              <Fragment key={`api-breadcrumb-${index}`}>
                {index !== 0 ? (
                  <div
                    className="api-modal__breadcrumbs__separator"
                    aria-hidden="true"
                  >
                    /
                  </div>
                ) : null}{' '}
                {index === items.length - 1 ? (
                  <Text as="span" className="api-modal__breadcrumbs__current">
                    {item.linkData.name}
                  </Text>
                ) : (
                  <TypeLink
                    linkData={item.linkData}
                    breadCrumbs={item.breadCrumbs}
                  />
                )}
              </Fragment>
            );
          })
        : null}
    </Flex>
  );
};
