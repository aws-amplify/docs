import styled from "@emotion/styled";

export const FilterSelectStyle = styled.div`
  position: relative;
  flex-grow: 2;

  display: block;
  user-select: none;

  div {
    width: 100%;
  }

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

  .unsupported > a {
    background-color: var(--bg-color-hover);
    opacity: 0.5;

    &:hover {
      background-color: var(--bg-color-secondary);
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
