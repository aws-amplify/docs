import styled from "@emotion/styled";
import {MAX_WIDTH} from "../media";

type ContainerProps = {
  backgroundColor: string;
};

export const Container = styled.section<ContainerProps>(
  (props) => `
  display: block;
  width: 100%;
  ${props.backgroundColor &&
    `background-color: var(--${props.backgroundColor});`}

  > div {
    max-width: ${MAX_WIDTH};
    margin: 0px auto;
  }
`,
);
