import { Children } from 'react';
import { View, Tabs, TabItem } from '@aws-amplify/ui-react';
import { BlockProps } from './Block';

interface BlockSwitcher {
  children: BlockProps | BlockProps[];
}

export const BlockSwitcher = ({ children }) => {
  return (
    <View className="block-switcher">
      <Tabs>
        {Children.map(children, (child, index) => {
          return child.props.name ? (
            <TabItem title={child.props.name} key={index}>
              {child}
            </TabItem>
          ) : null;
        })}
      </Tabs>
    </View>
  );
};
