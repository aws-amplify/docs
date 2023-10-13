import { Icon } from '@aws-amplify/ui-react';

export const MenuChevron = ({open}) => (
    <Icon
      className={`menu-chevron  ${open ? 'menu-chevron--open' : ''}`}
      viewBox={{ width: 12, height: 12 }}
      fill="none"
      width="12"
      height="12"
      aria-hidden={true}
      paths={[
        {
          d:
            'M3.96289 0.75L2.99954 1.71335L7.28566 6L2.99954 10.2867L3.96289 11.25L9.21289 6L3.96289 0.75Z',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: '#000716'
        }
      ]}
    />
  );