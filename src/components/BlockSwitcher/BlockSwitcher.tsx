import { Children, useId } from 'react';
import { View, Tabs } from '@aws-amplify/ui-react';
import { BlockProps } from './Block';

interface BlockSwitcherProps {
  children: React.ReactElement<BlockProps>[];
}

export const BlockSwitcherErrorMessage =
  'BlockSwitcher requires more than one block element';

export const BlockSwitcher = ({ children }: BlockSwitcherProps) => {
  const uniqueId = useId();

  if (!children.length || children.length <= 1) {
    throw new Error(BlockSwitcherErrorMessage);
  }

  /**
   * convert names with spaces to valid ID attribute values
   */
  const convertNameToValue = (name: string) => {
    const converted = `${name.split(' ').join('-').toLowerCase()}-${uniqueId}`;
    const emojiRegex = /\p{Emoji}/u;
    if (emojiRegex.test(name)) {
      return converted.replace(/\p{Emoji}/gu, '');
    }
    return converted;
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
