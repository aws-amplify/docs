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

  /**
   * convert names with spaces to valid aria-controls values
   */
  const convertNameToValue = (name: string) => {
    return name.split(' ').join('-').toLowerCase();
  };

  return (
    <View className="block-switcher">
      <Tabs.Container defaultValue={convertNameToValue(children[0].props.name)}>
        <Tabs.List>
          {Children.map(children, (child, index) => {
            return (
              child.props.name && (
                <Tabs.Item
                  value={convertNameToValue(child.props.name)}
                  key={index}
                >
                  {child.props.name}
                </Tabs.Item>
              )
            );
          })}
        </Tabs.List>
        {Children.map(children, (child, index) => {
          return (
            child.props.name && (
              <Tabs.Panel
                value={convertNameToValue(child.props.name)}
                key={index}
              >
                {child}
              </Tabs.Panel>
            )
          );
        })}
      </Tabs.Container>
    </View>
  );
};
