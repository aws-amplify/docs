import {css} from "emotion";
import {MAX_WIDTH} from "../styles/media";

export const sidebarLayoutStyle = css`
  display: flex;
  flex-direction: row;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  background-color: var(--bg-color);
`;
