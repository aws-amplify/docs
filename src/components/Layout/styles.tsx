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

  padding: 1em;
  width: 100%;

  .searchable-code {
    display: none;
  }
`;

export const LayoutStyle = styled.div`
  display: flex;
  flex-direction: row;
`;
