import {css} from "emotion";
import {MQTablet} from "../../styles/media";

export const sidebarCloseButtonStyle = css`
  margin: 0.5rem 0.75rem 0 0;
  width: 2rem;
  background-color: var(--amplify-background-color);

  :hover {
    cursor: pointer;
  }

  display: none;
  ${MQTablet} {
    display: initial;
  }

  > a > img {
    width: 1.5rem;
    height: 1.5rem;
    float: right;
  }
`;
