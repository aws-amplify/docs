import styled from "@emotion/styled";

export const ActiveSwitchStyle = styled.a`
  background-color: var(--primary-color);
  > span {
    color: var(--font-color-contrast);
    font-weight: 600;
  }
`;

export const SwitchStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
  border: 0.0625rem solid var(--border-color);

  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: stretch;
    text-align: center;

    > a {
      color: var(--font-color);
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.25rem;
      line-height: 1.25rem;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
