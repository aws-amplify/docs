import styled from "@emotion/styled";

export const HostStyle = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  background-color: white;
  border: 0.0625rem solid var(--border-color);
  border-radius: 0.25rem;
  > pre {
    display: none;
  }
`;

export const TabStyle = styled.button`
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  height: 100%;
  appearance: none;
  background-color: transparent;
  padding: 0.75rem 1rem 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
`;

export const ActiveTabStyle = styled.button`
  font-weight: 700;
  border-bottom: 0.25rem solid var(--primary-color);
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  height: 100%;
  appearance: none;
  background-color: transparent;
  padding: 0.75rem 1rem 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
`;

export const TabContainerStyle = styled.div`
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-bottom: 0.0625rem solid var(--border-color);
`;

type BlockShowProps = {
  index: number;
};

export const BlockShowStyle = styled.div<BlockShowProps>`
  margin: 1rem;
  & > div {
    display: none;
  }

  & > div:nth-of-type(${(props) => props.index + 1}) {
    display: initial;
  }
`;
