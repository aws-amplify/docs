import { Icon } from '@aws-amplify/ui-react';

export const IconInfo = ({ ...rest }) => {
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
        d="M10.5 13.5V15H9V18H15V15H13.5V10.5H9V13.5H10.5Z"
        fill="currentColor"
      />
      <path d="M13.5 9V6H10.5V9H13.5Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        fill="currentColor"
      />
    </Icon>
  );
};
