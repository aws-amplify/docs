import styled from '@emotion/styled';
import { MQTablet } from '../media';

export const Toggle = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  right: 1rem;
  margin-top: 14px;
  width: 52px;
  height: 116px;
  background: #ffffff;
  border: 2px solid #d1d5db;
  box-shadow: 0px 4px 20px rgba(0, 7, 22, 0.12);
  border-radius: 48px;
  transition: right 0.4s;

  img {
  }

  button {
    background: none;
    padding: 0 !important;
  }

  ${MQTablet} {
    display: none;
  }
`;

export const Divider = styled.div`
  height: 2px;
  width: 20px;
  left: 32px;
  background: #e9ebed;
  align-self: center;
  margin: 18px;
`;
