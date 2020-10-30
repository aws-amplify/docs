import {css} from "emotion";
import {MQTablet} from "../../styles/media";

export const sidebarCloseButtonStyle = css`
  margin-right: 0.3em;
  margin-top: 0.3em;
  position: sticky;
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
