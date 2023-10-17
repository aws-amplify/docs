import styled from '@emotion/styled';
import { MQTablet, MQLaptop } from '../media';

export const BannerContainer = styled.div`
  text-align: center;
  display: none;

  ${MQLaptop} {
    display: block;
    margin-top: 24px;
  }
`;
