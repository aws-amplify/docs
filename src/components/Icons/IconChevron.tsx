import { Icon } from '@aws-amplify/ui-react';

export const IconChevron = ({ ...rest }) => {
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
        d="M24 7.20194L21.7981 5L12 14.7968L2.20194 5L0 7.20194L12 19.2019L24 7.20194Z"
        fill="currentColor"
      />
    </Icon>
  );
};
