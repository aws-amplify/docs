import styled from "@emotion/styled";
import React from "react";

type CalloutProps = {
  info?: boolean;
  warning?: boolean;
};

export const CalloutOuter = styled.div<CalloutProps>((props) => {
  return `
  display: block;
  padding-left: 0.75rem;
  margin-bottom: 1rem;
  ${props.info ? `background-color: var(--color-ink-hv);` : ""}
  ${props.warning ? `background-color: var(--color-orange-hv);` : ""}

  p {
    margin-bottom: 0;
    margin-top: 1rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;
});

export const CalloutInner = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.75);
`;

const Callout: React.FC<CalloutProps> = ({info, warning, children}) => {
  if (typeof warning === "undefined") info = true;
  return (
    <CalloutOuter info={info} warning={warning}>
      <CalloutInner>{children}</CalloutInner>
    </CalloutOuter>
  );
};

export default Callout;
