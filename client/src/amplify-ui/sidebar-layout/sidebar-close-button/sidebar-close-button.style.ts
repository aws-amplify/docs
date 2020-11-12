import {css} from "emotion";
import {MQTablet} from "../../styles/media";

export const sidebarCloseButtonStyle = css`
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

  > a > img {
    width: 1.5rem;
    height: 1.5rem;
    float: right;
  }
`;
