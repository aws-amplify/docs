import styled from "@emotion/styled";

export const PlatformSelectStyle = styled.div`
  position: relative;
  flex-grow: 2;

  display: block;
  user-select: none;

  div > a {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid var(--border-color);
    color: var(--font-color);

    span {
      margin-left: 0.5rem;
    }

    &:hover {
      background-color: var(--bg-color-hover);
    }
  }
`;

export const CurrentlySelectedStyle = styled.div`
  display: flex;
  flex-direction: row;

  box-shadow: rgba(0, 0, 0, 0.09) 0.3125rem 0.3125rem 0 -0.0625rem;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:active {
    box-shadow: initial;
  }
`;

type DropdownProps = {
  shouldDisplay: boolean;
};

export const DropdownStyle = styled.div<DropdownProps>`
  position: absolute;
  background-color: var(--bg-color);
  box-shadow: rgba(0, 0, 0, 0.09) 0.3125rem 0.3125rem 0 -0.0625rem;
  width: 100%;
  z-index: 1;
  div > a {
    border: 0.0625rem solid var(--color-grey-md);
    border-top: 0;
  }

  visibility: ${(props) => (props.shouldDisplay ? "visible" : "hidden")};
`;

export const MenuHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.75rem 2.75rem 0 2.5rem;
`;

export const DirectoryStyle = styled.div`
  display: block;
  padding: 0 2.5rem;
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
