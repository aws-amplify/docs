import {css} from "emotion";

export const nextPreviousLinkContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const nextPreviousLinkStyle = css`
  &:first-child {
    margin-right: 1rem;
  }

  a {
    display: flex;
    flex-direction: row;

    &:hover {
      text-decoration: none;
    }
  }

  h4,
  span {
    color: var(--font-color);
    text-align: right;
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

export const textGroupStyle = css`
  display: flex;
  flex-direction: column;

  > * {
    display: block;
  }
`;

export const textAlignmentStyleByDirection = {
  next: css`
    align-items: flex-end;
  `,
  previous: css`
    align-items: flex-start;
  `,
};
