import styled from "@emotion/styled";

export const ContentStyle = styled.div`
  a {
    & h2,
    & h3 {
      color: var(--font-color);
    }

    &:hover,
    & h2:hover,
    & h3:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const LayoutStyle = styled.div`
  display: flex;
  flex-direction: row;
`;
