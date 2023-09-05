import { Icon } from '@aws-amplify/ui-react';
import styled from '@emotion/styled';

const LinkWrapper = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
  svg {
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2px;
  }
`;

export const ExternalLinkIcon = () => (
  <LinkWrapper>
    <Icon aria-hidden="true" viewBox={{ width: 16, height: 16 }}>
      <path d="M10 2h4v4"></path>
      <path d="m6 10 8-8"></path>
      <path d="M14 9.048V14H2V2h5"></path>
    </Icon>
  </LinkWrapper>
);
