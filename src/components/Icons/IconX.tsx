import { Icon } from '@aws-amplify/ui-react';

export const IconX = ({ ...rest }) => {
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
        d="M22 3.8182L3.81818 22L2 20.1818L20.1818 2.00002L22 3.8182Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.81818 2L22 20.1818L20.1818 22L2 3.81818L3.81818 2Z"
        fill="currentColor"
      />
    </Icon>
  );
};
