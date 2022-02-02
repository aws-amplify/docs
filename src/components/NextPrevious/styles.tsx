import styled from "@emotion/styled";

export const NextPreviousContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const NextPreviousLinkStyle = styled.a`
  &:first-child {
    margin-right: 1rem;
  }

  display: flex;
  flex-direction: row;

  &:hover {
    text-decoration: none;
  }

  h4,
  span {
    color: var(--font-color);
    text-align: right;
  }

  h4 {
    margin-bottom: 1rem;
  }

  span {
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  img {
    margin-left: 1rem;
    width: 0.5rem;
  }

  &:first-child {
    img {
      margin-left: 0;
      margin-right: 1rem;
    }

    h4,
    span {
      text-align: left;
    }
  }
`;

type NextPreviousTextProps = {
  isPrevious: boolean;
};
export const NextPreviousTextStyle = styled.div<NextPreviousTextProps>(
  ({isPrevious}) => `
  display: flex;
  flex-direction: column;

  > * {
    display: block;
  }

  align-items: ${isPrevious ? "flex-start" : "flex-end"};
`,
);
