import { Icon } from '@aws-amplify/ui-react';

export const IconExternalLink = ({ ...rest }) => {
  return (
    <Icon
      {...rest}
      viewBox={{ minX: 0, minY: 0, width: 12, height: 12 }}
      aria-hidden="true"
      paths={[
        {
          d: 'M2.25 10.25H9.75V7.2875H11.25V11C11.25 11.4142 10.9142 11.75 10.5 11.75H1.5C1.08579 11.75 0.75 11.4142 0.75 11V2C0.75 1.58579 1.08579 1.25 1.5 1.25H5.25V2.75H2.25V10.25ZM6.75 1.25H9.75H11.25V2.75V5.75H9.75V3.81066L5.03033 8.53033L3.96967 7.46967L8.68934 2.75H6.75V1.25Z',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: '#000716'
        }
      ]}
    />
  );
};
