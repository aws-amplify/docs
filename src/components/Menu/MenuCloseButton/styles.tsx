import styled from "@emotion/styled";
import {MQTablet} from "../../media";

export const MenuCloseButtonStyle = styled.button`
  width: 2rem;
  margin-right: 0.75rem;
  height: 100%;
  background-color: var(--amplify-background-color);

  &:hover {
    cursor: pointer;
  }

  display: none;
  ${MQTablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img {
    width: 2rem;
    height: 2rem;
    float: right;
  }
`;
