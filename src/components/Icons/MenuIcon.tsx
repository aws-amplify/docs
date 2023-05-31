import { Icon } from '@aws-amplify/ui-react';
import styled from '@emotion/styled';

const MenuWrapper = styled.span`
  stroke: currentColor;
  stroke-width: 2;
  cursor: pointer;
`;

export const MenuIcon = ({ ariaLabel, onClick }) => (
  <MenuWrapper>
    <Icon
      ariaLabel={ariaLabel}
      onClick={onClick}
      pathData="M15 8H1M15 3H1M15 13H1"
      stroke="currentColor"
      strokeWidth="2"
      viewBox={{
        minX: 0,
        minY: 0,
        width: 16,
        height: 16
      }}
    />
  </MenuWrapper>
);
