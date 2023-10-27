import { Icon } from '@aws-amplify/ui-react';

export const IconExternalLink = ({ ...rest }) => {
  return (
    <Icon
      aria-hidden="true"
      {...rest}
      viewBox={{ minX: 0, minY: 0, width: 24, height: 24 }}
    >
      <path
        d="M3.42857 20.5714H20.5714V13.8H24V22.2857C24 23.2325 23.2325 24 22.2857 24H1.71429C0.767512 24 0 23.2325 0 22.2857V1.71429C0 0.767512 0.767512 0 1.71429 0H10.2857V3.42857H3.42857V20.5714Z"
        fill="currentColor"
      />
      <path
        d="M13.7143 0H24V10.2857H20.5714V5.85292L9.7836 16.6407L7.35924 14.2164L18.147 3.42857H13.7143V0Z"
        fill="currentColor"
      />
    </Icon>
  );
};
