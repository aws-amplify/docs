import { Flex, Text, Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { AmplifyLogo } from './icons';
import { IconChevron } from '@/components/Icons';

export function AmplifyNavLink({ isCollapsed, setIsCollapsed }) {
  const chevronRotation = isCollapsed ? '0' : '180';
  return (
    <Flex className="navbar__logo-container">
      <Flex
        className="navbar-logo-link"
        as="a"
        href="/"
        gap="xs"
        alignItems="center"
        direction="row"
      >
        <AmplifyLogo />
        <Text as="span" className="navbar-logo-text">
          <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
          <span style={{ fontWeight: '300' }}>Docs</span>
        </Text>
      </Flex>

      <Button
        aria-expanded={!isCollapsed}
        aria-controls="mobile-nav-links"
        variation="link"
        size="large"
        className="mobile-only navbar-expander"
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
