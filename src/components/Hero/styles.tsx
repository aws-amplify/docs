import styled from '@emotion/styled';

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 9rem 1.5rem 1.5rem;
  background-color: var(--bg-color);

  h1 {
    margin-bottom: 0.875rem;
  }

  > p {
    color: var(--font-color-secondary);
    font-weight: 500;
  }

  @media (min-width: 975px) {
    padding: 6rem 1.5rem 1.5rem;
  }
`;
