import styled from "@emotion/styled";
import { MAX_WIDTH } from "../media";

export const Container = styled.section(
  (props) => `
  display: block;
  width: 100%;
  ${props.backgroundColor && `background-color: var(--${props.backgroundColor});`}

  > div {
    max-width: ${MAX_WIDTH};
    margin: 0px auto;
  }
`
);
