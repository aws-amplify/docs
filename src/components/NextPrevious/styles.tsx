import styled from '@emotion/styled';

export const NextPreviousContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const NextPreviousLinkStyle = styled.a<NextPreviousProps>(
  ({ isPrevious }) => `
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
    text-align: ${isPrevious ? 'left' : 'right'};
  }

  h4 {
    margin-bottom: 1rem;
    margin-top: 0;
  }

  span {
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  img {
    margin-left: ${isPrevious ? '0' : '1rem'};
    margin-right: ${isPrevious ? '1rem' : '0'};
    width: 0.5rem;
  }
`
);

type NextPreviousProps = {
  isPrevious: boolean;
};
export const NextPreviousTextStyle = styled.div<NextPreviousProps>(
  ({ isPrevious }) => `
  display: flex;
  flex-direction: column;

  > * {
    display: block;
  }

  align-items: ${isPrevious ? 'flex-start' : 'flex-end'};
`
);
