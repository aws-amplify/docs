import {MQTablet} from "../../styles/media";
import {css} from "emotion";

export const sidebarLayoutSidebarToggleStyle = css`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;

  ${MQTablet} {
    display: none;
  }

  .ex-graphic {
    display: none;
  }

  &.in-view {
    .burger-graphic {
      display: none;
    }
    .ex-graphic {
      display: initial;
    }
  }
`;
