import styled from "@emotion/styled";

export const MenuHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.75rem 2.75rem 0 2.5rem;
`;

export const MenuStyle = styled.div`
  border-right: 0.0625rem solid var(--border-color);
  min-width: 20rem;

  > div {
    position: relative;
    min-height: 100vh;
    height: 100%;

    > div {
      position: sticky;
      top: 3.375rem;

      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow-y: auto; /* for Firefox */
      overflow-y: overlay; /* for Webkit browsers */
      margin-bottom: 6rem;
    }
  }
`;

export const MenuBodyStyle = styled.div`
  display: block;
  margin: 0 2.5rem;
`;

export const MenuBreakStyle = styled.hr`
  border-top: 0.0625rem solid var(--color-grey-lt);
  margin: 1.5rem -2.5rem 1.5rem -2.5rem;
`;

export const DiscordLinkStyle = styled.div`
  > a {
    display: flex;
    background-color: var(--color-discord-blue);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
    padding: 0.675rem 1rem;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }

  a {
    display: flex;
    color: var(--color-white);
    font-weight: 700;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
  }
`;
