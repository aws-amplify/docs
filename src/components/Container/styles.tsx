import styled from "@emotion/styled";
import {MAX_WIDTH} from "../media";

type ContainerProps = {
  backgroundColor?: string;
};

export const OuterContainer = styled.section<ContainerProps>(
  (props) => `
  display: block;
  width: 100%;
  overflow-x: hidden;
  ${props.backgroundColor &&
    `background-color: var(--${props.backgroundColor});`}

`,
);

export const InnerContainer = styled.div<ContainerProps>((props) => {
  return `
  max-width: ${MAX_WIDTH};
  margin: 0px auto;
  ${
    props.backgroundColor === "bg-color-tertiary"
      ? `background-color: #fff`
      : ""
  }
`;
});

export const Container = ({
  children,
  backgroundColor,
}: {
  children: any;
  backgroundColor?: string;
}) => (
  <OuterContainer backgroundColor={backgroundColor || null}>
    <InnerContainer backgroundColor={backgroundColor || null}>
      {children}
    </InnerContainer>
  </OuterContainer>
);
