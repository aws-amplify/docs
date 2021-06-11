import styled from "@emotion/styled";
import {MAX_WIDTH} from "../media";

type ContainerProps = {
  backgroundColor?: string;
};

export const OuterContainer = styled.section<ContainerProps>(
  (props) => `
  display: block;
  width: 100%;
  ${props.backgroundColor &&
    `background-color: var(--${props.backgroundColor});`}

`,
);

export const InnerContainer = styled.div`
  max-width: ${MAX_WIDTH};
  margin: 0px auto;
`;

export const Container = ({
  children,
  backgroundColor,
}: {
  children: any;
  backgroundColor?: string;
}) => (
  <OuterContainer backgroundColor={backgroundColor || null}>
    <InnerContainer>{children}</InnerContainer>
  </OuterContainer>
);
