import { Flex, Text, Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { AmplifyLogo } from './icons';
import { IconChevron } from '@/components/Icons';
import { GenSwitcher } from '@/components/GenSwitcher';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

export function AmplifyNavLink({ isCollapsed, setIsCollapsed, isGen1 }) {
  const chevronRotation = isCollapsed ? '0' : '180';
  const currentPlatform = useCurrentPlatform() || '';

  return (
    <Flex className="navbar__logo-container">
      <Flex
        className={`navbar-logo-link${isGen1 ? ' navbar-logo-link--gen1' : ''}`}
        as="a"
        href={isGen1 ? `/gen1/${currentPlatform}` : `/${currentPlatform}`}
      >
        <AmplifyLogo />
        <Text as="span" className="navbar-logo-text">
          <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
          <span style={{ fontWeight: '300' }}>Docs</span>
        </Text>
      </Flex>

      <GenSwitcher isGen1={isGen1} />

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
