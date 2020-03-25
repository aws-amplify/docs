import {MQTablet} from "../../styles/media";
import {css} from "emotion";

export const sidebarLayoutSidebarToggleStyle = css`
  cursor: pointer;
  z-index: 10;

  ${MQTablet} {
    display: none;
  }
`;

export const unclickableStyle = css`
  pointer-events: none;
`;
