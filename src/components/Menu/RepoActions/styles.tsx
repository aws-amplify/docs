import styled from "@emotion/styled";

export const RepoActionsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 0.25rem;

  &:first-child > a {
    margin-right: 2rem;
  }

  > a {
    display: flex;
    align-items: center;
    color: var(--font-color);
  }

  &:hover {
    opacity: 0.8;
  }

  img {
    position: relative;
    top: 0.0625rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;
