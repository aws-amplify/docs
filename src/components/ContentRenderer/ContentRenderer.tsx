import { ContentItemType } from './ContentItem';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { Children, ReactElement, isValidElement } from 'react';

type ContentRendererProps = {
  children: ReactElement<ContentItemType>[];
};

function isSpecificPlatform(element, platform: string) {
  return (
    isValidElement(element) &&
    (element as ReactElement<ContentItemType>).props.platform === platform
  );
}

export function ContentRenderer({ children }: ContentRendererProps) {
  const currentPlatform = useCurrentPlatform();

  let content;
  const childrenArr = Children.toArray(children);

  // Filter out the content based on platform
  if (currentPlatform === 'nextjs') {
    content = childrenArr.find((child) => isSpecificPlatform(child, 'nextjs'));

    if (!content) {
      content = childrenArr.find((child) => isSpecificPlatform(child, 'react'));
    }
  } else {
    content = childrenArr.find((child) =>
      isSpecificPlatform(child, currentPlatform)
    );
  }

  return <>{content}</>;
}
