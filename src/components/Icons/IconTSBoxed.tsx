import { Icon } from '@aws-amplify/ui-react';

export const IconTSBoxed = ({ ...rest }) => {
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
        d="M42.9998 5H4.99976V43H42.9998V5Z"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M36.0036 21.002H29.1278C28.5755 21.002 28.1278 21.4497 28.1278 22.002V27.5027C28.1278 28.055 28.5755 28.5027 29.1278 28.5027H35.0036C35.5559 28.5027 36.0036 28.9504 36.0036 29.5027V35.0035C36.0036 35.5557 35.5558 36.0035 35.0036 36.0035H28.1278M22.8773 21.002H18.9394M15.0015 21.002H18.9394M18.9394 21.002V36.0035"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
        fill="none"
      />
    </Icon>
  );
};
