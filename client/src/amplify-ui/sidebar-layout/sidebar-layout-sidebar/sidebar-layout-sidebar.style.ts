import {MQTablet} from "../../styles/media";
import {css} from "emotion";

export const sidebarLayoutSidebarStyle = css`
  display: none;
  border-right: 0.0625rem solid var(--border-color);
  min-width: 20rem;

  ${MQTablet} {
    display: initial;
  }

  &.in-view {
    display: initial;
  }

  > div {
    position: relative;
    min-height: 100vh;
    height: 100%;

    > div {
      position: sticky;
      display: flex;
      flex-direction: column;
      max-height: 100vh;
    }
  }
`;
