import { Flex, Message } from '@aws-amplify/ui-react';
import { IconWarning, IconInfo } from '../Icons';

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
      hasIcon={false}
    >
      <Flex>
        <div className="amplify-message__icon">
          {warning ? (
            <IconWarning aria-hidden={false} aria-label="Warning" />
          ) : (
            <IconInfo aria-hidden={false} aria-label="Important information" />
          )}
        </div>
        <div>{children}</div>
      </Flex>
    </Message>
  );
};
