import { useContext, useId } from 'react';
import {
  ColorMode,
  Flex,
  Text,
  ToggleButton,
  ToggleButtonGroup,
  VisuallyHidden
} from '@aws-amplify/ui-react';
import { IconDark, IconLight, IconSystem } from '@/components/Icons';
import { ColorModeSwitcherProps } from './types';

import { LayoutContext } from '@/components/Layout/LayoutProvider';

export const ColorModeSwitcher = ({ testId }: ColorModeSwitcherProps) => {
  const { colorMode, handleColorModeChange } = useContext(LayoutContext);
  const colorSwitcherLabelId = `${useId()}-colorSwitcherLabel`;
  return (
    <Flex className="color-switcher" testId={testId}>
      <Text
        as="span"
        className="color-switcher__label"
        id={colorSwitcherLabelId}
      >
        Site color mode
      </Text>

      <ToggleButtonGroup
        aria-labelledby={colorSwitcherLabelId}
        value={colorMode}
        size="small"
        onChange={(value) => handleColorModeChange(value as ColorMode)}
        isExclusive
        isSelectionRequired
      >
        <ToggleButton value="light" title="Light mode">
          <IconLight />
          <VisuallyHidden>Light mode</VisuallyHidden>
        </ToggleButton>
        <ToggleButton value="dark" title="Dark mode">
          <IconDark />
          <VisuallyHidden>Dark mode</VisuallyHidden>
        </ToggleButton>
        <ToggleButton value="system" title="System preferences">
          <IconSystem />
          <VisuallyHidden>System preference</VisuallyHidden>
        </ToggleButton>
      </ToggleButtonGroup>
    </Flex>
  );
};
