import { Flex, Message } from '@aws-amplify/ui-react';
import { IconInfo } from '../Icons/IconInfo';

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
          <IconInfo
            aria-hidden={false}
            aria-label={warning ? 'warning icon' : 'info icon'}
          />
        </div>
        <div>{children}</div>
      </Flex>
    </Message>
  );
};
