import {css} from "emotion";
import {MQTablet} from "../../styles/media";

export const sidebarOpenButtonStyle = css`
  margin-left: 0.5rem;
  position: absolute;
  top: 3.5em;
  display: none;

  ${MQTablet} {
    display: initial;
  }

  > a > img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
