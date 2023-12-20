import { Icon } from '@aws-amplify/ui-react';

export const IconExpand = ({ ...rest }) => {
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
        d="M1.9115 2C0.85581 2 0 2.85581 0 3.9115V16.6549C0 17.1618 0.20139 17.648 0.559867 18.0065C0.918343 18.365 1.40454 18.5664 1.9115 18.5664H8.81416V14.7434H3.82301L3.82301 5.82301L20.177 5.82301V8.15929H24V3.9115C24 2.85581 23.1442 2 22.0885 2H1.9115Z"
        fill="currentColor"
      />
      <path
        d="M19.2212 10.6814V14.7434H23.4159V18.5664H19.2212V22.6283H15.3982V18.5664H11.469V14.7434L15.3982 14.7434V10.6814H19.2212Z"
        fill="currentColor"
      />
    </Icon>
  );
};
