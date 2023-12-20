import { Icon } from '@aws-amplify/ui-react';

export const IconKotlin = ({ ...rest }) => {
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
      <path d="M24 0H0V24H24L12 12L24 0Z" fill="currentColor" />
    </Icon>
  );
};
