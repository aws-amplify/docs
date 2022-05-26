import styled from "@emotion/styled";
import {MQFablet} from "../media";

type ContentProps = {
  menuIsOpen?: boolean;
};

export const ContentStyle = styled.div<ContentProps>(({menuIsOpen}) => {
  return `
  padding: 1.5rem 1rem;
  width: 100%;
  overflow-x: hidden;

  .searchable-code {
    display: none;
  }

  > div {
    ${menuIsOpen ? "min-width: 100vw;" : "min-width: initial;"}
    ${MQFablet} {
      min-width: initial;
      padding: 1.5rem 2rem 1.5rem 4rem;
    }
  }

  a {
    & h2,
    & h3 {
      color: var(--font-color);
    }

    &:hover,
    & h2:hover,
    & h3:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  h1 {
    margin-top: 0.375rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;

    li + li {
      margin-top: 0.25rem;
    }
  }

  .searchable-code {
    display: none;
  }

  amplify-authenticator {
    --container-height: auto;
    --container-display: inline;
  }
  `;
});

export const ChapterTitleStyle = styled.h1`
  line-height: normal;
  margin-bottom: 0px;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--font-color-secondary);
  font-weight: bold;
`;

export const LastUpdatedStyle = styled.p`
  font-style: italic;
`;