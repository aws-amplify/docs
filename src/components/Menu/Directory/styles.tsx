import styled from "@emotion/styled";

export const DirectoryGroupHeaderStyle = styled.button`
  width: 100%;
  text-align: initial;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  appearance: none;
  background-color: transparent;

  h4 {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--bg-color-hover);
  }
`;

type ArrowProps = {
  isUp: boolean;
};
export const ArrowStyle = styled.i<ArrowProps>(
  ({isUp}) => `
  border: solid black;
  border-width: 0 0.125rem 0.125rem 0;
  padding: 0.1875rem;
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  ${
    isUp
      ? "margin-top: 0.125rem; transform: rotate(-135deg);"
      : "margin-bottom: 0.125rem; transform: rotate(45deg);"
  }
`,
);

export const DirectoryLinksStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

type DirectoryGroupItemProps = {
  isActive: boolean;
};
export const DirectoryGroupItemStyle = styled.div<DirectoryGroupItemProps>(
  ({isActive}) => `
  stencil-route-link,
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  a {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    color: var(--font-color-secondary);
    ${isActive ? "background-color: var(--bg-color-hover);" : ""});
    &:hover {
      background-color: var(--bg-color-hover);
    }
  }
`,
);

type ProductRootLinkProps = {
  isActive: boolean;
};
export const ProductRootLinkStyle = styled.a<ProductRootLinkProps>(
  ({isActive}) => `
  display: flex;
  flex-direction: row;
  font-weight: 700;
  margin-top: 2rem;

  display: block;
  width: 100%;
  padding: 0.5rem;

  color: var(--color-dark-hv) !important;
  ${isActive ? "background-color: var(--bg-color-hover);" : ""});
  &:hover {
    color: var(--color-dark-hv);
    background-color: var(--bg-color-hover);
  }
`,
);
