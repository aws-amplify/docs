import { Icon } from '@aws-amplify/ui-react';

export const IconLearn = ({ ...rest }) => {
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
        d="M2 22.5V1.5C2 0.67125 2.65372 0 3.46173 0H4.92493V24H3.46173C2.65372 24 2 23.3288 2 22.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.38725 0H21.0119C21.8199 0 22.4744 0.67125 22.4744 1.5V22.5C22.4744 23.3288 21.8199 24 21.0119 24H6.38725V0ZM9.31218 12H18.087V10.5H9.31218V12ZM9.31218 7.5H18.087V6H9.31218V7.5Z"
        fill="currentColor"
      />
    </Icon>
  );
};
