import { Icon } from '@aws-amplify/ui-react';

export const IconMenu = ({ ...rest }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5H24V7H0V5ZM0 11H24V13H0V11ZM24 17H0V19H24V17Z"
        fill="currentColor"
      />
    </Icon>
  );
};
