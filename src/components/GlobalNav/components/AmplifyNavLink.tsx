import { Flex, Text, Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { AmplifyLogo } from './icons';
import { IconChevron } from '@/components/Icons';

export function AmplifyNavLink({ currentSite, isCollapsed, setIsCollapsed }) {
  const chevronRotation = isCollapsed ? '0' : '180';
  return (
    <Flex className="navbar__logo-container">
      <Flex
        className={'desktop-only'}
        gap="xs"
        alignItems="center"
        direction="row"
      >
        <AmplifyLogo />
        <Text as="span" className="dev-center-logo">
          <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
          <span style={{ fontWeight: '300' }}>Dev Center</span>
          <span className="mobile-only">
            {' '}
            <IconChevron /> {currentSite}
          </span>
        </Text>
      </Flex>

      <Flex className="mobile-only mobile-current-link" as="a" href="/">
        <AmplifyLogo />
        <Text as="span" className="dev-center-logo">
          <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
          <span style={{ fontWeight: '300' }}>Dev Center</span>
          <span className="mobile-only">
            {' '}
            <IconChevron className="icon-rotate-270" fontSize="xs" />{' '}
            {currentSite}
          </span>
        </Text>
      </Flex>

      <Button
        aria-expanded={!isCollapsed}
        aria-controls="mobile-nav-links"
        variation="link"
        size="large"
        className="mobile-only nav-expander"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <VisuallyHidden>
          {isCollapsed ? 'Open Dev Center menu' : 'Close Dev Center menu'}
        </VisuallyHidden>
        <IconChevron
          fontSize="xs"
          className={`icon-rotate-${chevronRotation}`}
        />
      </Button>
    </Flex>
  );
}
