import { Flex, VisuallyHidden } from '@aws-amplify/ui-react';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import { Popover } from '@/components/Popover';
import { DEFAULT_PLATFORM, Platform } from '@/constants/platforms';
import { useIsGen1Page } from '@/utils/useIsGen1Page';
import { UrlObject } from 'url';
import { gen1GetStartedHref, gen2GetStartedHref } from '@/data/index-page-data';

export type GetStartedLinksType = {
  title: string;
  href: UrlObject;
  icon: JSX.Element;
  platform: Platform;
};

type GetStartedPopoverType = {
  platform: Platform | typeof DEFAULT_PLATFORM;
  getStartedLinks: GetStartedLinksType[];
  testId?: string;
};

export const GetStartedPopover = ({
  platform,
  getStartedLinks,
  testId
}: GetStartedPopoverType) => {
  const isGen1Page = useIsGen1Page();

  return (
    <Flex className="split-button">
      <InternalLinkButton
        variation="primary"
        size="large"
        className="split-button__start"
        href={{
          pathname: isGen1Page ? gen1GetStartedHref : gen2GetStartedHref,
          query: { platform: platform }
        }}
      >
        Get started
      </InternalLinkButton>
      <Popover>
        <Popover.Trigger
          variation="primary"
          size="large"
          className="split-button__end"
        >
          <VisuallyHidden>
            Toggle getting started guides navigation
          </VisuallyHidden>
        </Popover.Trigger>
        <Popover.List testId={testId ? `${testId}-popoverList` : ''}>
          {getStartedLinks.map((link, index) => {
            return (
              <Popover.ListItem
                href={link.href}
                key={`getStartedLink-${index}`}
              >
                {link.icon}
                {link.title}
              </Popover.ListItem>
            );
          })}
        </Popover.List>
      </Popover>
    </Flex>
  );
};
