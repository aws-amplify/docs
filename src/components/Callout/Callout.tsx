import { Message, View } from '@aws-amplify/ui-react';

interface CalloutProps {
  info?: boolean;
  warning?: boolean;
  children?: React.ReactNode;
}

export const Callout = ({ warning, children }: CalloutProps) => {
  return (
    <Message variation="filled" colorTheme={warning ? 'warning' : 'info'}>
      <View>{children}</View>
    </Message>
  );
};
