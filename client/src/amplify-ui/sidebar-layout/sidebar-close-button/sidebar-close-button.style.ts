import {css} from "emotion";
import {MQTablet} from "../../styles/media";

export const sidebarCloseButtonStyle = css`
  margin: 0.75rem 0.75rem 0 0;

  user-select: none;
  display: none;

  :hover {
    cursor: pointer;
  }

  ${MQTablet} {
    display: initial;
  }

  > a > img {
    width: 1.5rem;
    height: 1.5rem;
    float: right;
  }
`;
