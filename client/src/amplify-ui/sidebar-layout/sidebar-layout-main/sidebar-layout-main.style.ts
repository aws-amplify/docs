import {MQFablet} from "../../styles/media";
import {css} from "emotion";

export const sidebarLayoutMainStyle = css`
  overflow-x: hidden;
  transition: 0.25s linear box-shadow;
  padding: 1.5rem 0;
  width: 100%;

  &.in-view {
    box-shadow: inset -0.5rem 0 0.5rem -0.5rem rgba(0, 0, 0, 0.5);
  }

  ${MQFablet} {
    &.in-view {
      box-shadow: initial;
    }
  }

  > div {
    min-width: 100vw;
    padding: 0 1rem;

    ${MQFablet} {
      min-width: initial;
      padding: 0 2rem 0 4rem;
    }
  }
`;
