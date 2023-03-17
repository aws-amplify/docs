import styled from '@emotion/styled';
import { MAX_WIDTH } from '../media';

export const LayoutStyle = styled.div`
  display: flex;
  flex-direction: row;
  max-width: ${MAX_WIDTH};

  margin-top: var(--docs-dev-center-nav);

  @media (min-width: 975px) {
    margin-top: 0px;
  }
`;
