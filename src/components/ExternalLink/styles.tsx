import styled from "@emotion/styled";

export const ExternalLink = styled.a`
  display: flex;
  flex: 1 1 0%;
  position: relative;
  background-color: var(--color-white);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: var(--font-color);
  padding: 1rem 0px;
  border-radius: 0.25rem;

  :hover {
    box-shadow: 0 0.125rem 0.25rem var(--color-black);
  }
`;

export const ExternalLinkGraphic = styled.img`
  margin-left: 0.25rem;
  height: 0.5rem;
`;
