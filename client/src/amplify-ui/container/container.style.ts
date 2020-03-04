import {css} from "emotion";
import {MAX_WIDTH} from "../styles/media";

export const containerStyle = css`
  display: block;
  width: 100%;

  > div {
    max-width: ${MAX_WIDTH};
    margin: 0px auto;
  }
`;
