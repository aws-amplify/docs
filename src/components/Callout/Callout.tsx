import { Message, View } from '@aws-amplify/ui-react';

interface CalloutProps {
  info?: boolean;
  warning?: boolean;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const Callout = ({
  warning,
  backgroundColor,
  children
}: CalloutProps) => {
  return (
    <Message
      variation="filled"
      colorTheme={warning ? 'warning' : 'info'}
      backgroundColor={backgroundColor}
    >
      <View>{children}</View>
    </Message>
  );
};
