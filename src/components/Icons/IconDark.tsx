import { Icon } from '@aws-amplify/ui-react';

export const IconDark = ({ ...rest }) => {
  return (
    <Icon
      aria-hidden="true"
      {...rest}
      viewBox={{
        minX: 0,
        minY: 0,
        width: 24,
        height: 24
      }}
    >
      <path
        d="M13.4165 0.00754715C6.51178 -0.232618 1 5.29117 1 11.9918C1 18.6203 6.37969 24 13.0082 24C17.4633 24 21.3299 21.5743 23.4074 17.9719C14.3892 17.6717 8.88941 7.84893 13.4165 0.00754715Z"
        fill="currentColor"
      />
    </Icon>
  );
};
