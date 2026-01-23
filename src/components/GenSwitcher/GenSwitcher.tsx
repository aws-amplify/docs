import { View, ViewProps, VisuallyHidden } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { IconCheck } from '@/components/Icons';
import { Popover } from '@/components/Popover';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

interface GenSwitcherProps extends ViewProps {
  isGen1?: boolean;
  testId?: string;
}

export const GenSwitcher = ({ isGen1, testId }: GenSwitcherProps) => {
  const currentPlatform = useCurrentPlatform() || '';

  return (
    <View className="gen-switcher" testId={testId}>
      <Popover>
        <Popover.Trigger
          size="small"
          className={classNames('gen-switcher__trigger', {
            'gen-switcher__trigger--gen1': isGen1
          })}
        >
          {isGen1 ? 'Gen 1' : 'Gen 2'}
          <VisuallyHidden>Open Amplify generation navigation</VisuallyHidden>
        </Popover.Trigger>
        <Popover.List anchor="left" className="gen-switcher__list">
          <Popover.ListItem href={`/legacy/${currentPlatform}`} current={!isGen1}>
            Gen 2 {isGen1 ? '' : <IconCheck className="gen-switcher__check" />}
          </Popover.ListItem>
          <Popover.ListItem href={`/legacy/gen1/${currentPlatform}`} current={isGen1}>
            Gen 1 {isGen1 ? <IconCheck className="gen-switcher__check" /> : ''}
          </Popover.ListItem>
        </Popover.List>
      </Popover>
    </View>
  );
};
