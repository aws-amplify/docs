import { Children } from 'react';
import { View, Tabs } from '@aws-amplify/ui-react';
import { BlockProps } from './Block';

interface BlockSwitcherProps {
  children: React.ReactElement<BlockProps>[];
}

export const BlockSwitcherErrorMessage =
  'BlockSwitcher requires more than one block element';

export const BlockSwitcher = ({ children }: BlockSwitcherProps) => {
  if (!children.length || children.length <= 1) {
    throw new Error(BlockSwitcherErrorMessage);
  }
  return (
    <View className="block-switcher">
      <Tabs.Container defaultValue={children[0].props.name}>
        <Tabs.List>
          {Children.map(children, (child, index) => {
            return (
              child.props.name && (
                <Tabs.Item value={child.props.name} key={index}>
                  {child.props.name}
                </Tabs.Item>
              )
            );
          })}
        </Tabs.List>
        {Children.map(children, (child, index) => {
          return (
            child.props.name && (
              <Tabs.Panel value={child.props.name} key={index}>
                {child}
              </Tabs.Panel>
            )
          );
        })}
      </Tabs.Container>
    </View>
  );
};
