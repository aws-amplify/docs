import {css} from "emotion";

export const responsiveGridStyle = css`
  display: grid;
  width: 100%;
  -ms-grid-columns: 1fr 1fr 1fr 1fr;
  grid-template-columns: repeat(1, 1fr);
`;
