import { Icon } from '@aws-amplify/ui-react';
import styled from '@emotion/styled';

const CloseWrapper = styled.span`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    &:hover {
      color: #000716;
    }
    path {
      stroke: currentColor;
      stroke-width: 2px;
    }
  }
`;

export const CloseIcon = ({ onClick }) => (
  <CloseWrapper>
    <Icon
      width="16px"
      height="16px"
      pathData="m2 2 12 12M14 2 2 14"
      ariaLabel="close"
      onClick={onClick}
      viewBox={{
        minX: 0,
        minY: 0,
        width: 16,
        height: 16
      }}
    />
  </CloseWrapper>
);
