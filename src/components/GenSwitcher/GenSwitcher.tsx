import { View, ViewProps } from '@aws-amplify/ui-react';
import { Popover } from '@/components/Popover';

interface GenSwitcherProps extends ViewProps {
  isGen1?: boolean;
}

export const GenSwitcher = ({ isGen1 }: GenSwitcherProps) => {
  return (
    <View className="gen-switcher">
      <Popover>
        <Popover.Trigger size="small" className="gen-switcher__trigger">
          {isGen1 ? 'Gen1' : 'Gen2'}
        </Popover.Trigger>
        <Popover.List anchor="left" className="gen-switcher__list">
          <Popover.ListItem href="/gen1">Gen 1</Popover.ListItem>
          <Popover.ListItem href="/gen2">Gen 2</Popover.ListItem>
        </Popover.List>
      </Popover>
    </View>
  );
};
