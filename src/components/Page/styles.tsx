import styled from "@emotion/styled";
import {MQFablet} from "../media";

export const ContentStyle = styled.div`
  padding: 1.5rem 1rem;
  width: 100%;
  overflow-x: hidden;

  .searchable-code {
    display: none;
  }

  ${MQFablet} {
    min-width: initial;
    padding: 1.5rem 2rem 1.5rem 4rem;
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

  .searchable-code {
    display: none;
  }

  amplify-authenticator {
    --container-height: auto;
    --container-display: inline;
  }
`;

export const ChapterTitleStyle = styled.h1`
  line-height: normal;
  margin-bottom: 0px;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--font-color-secondary);
  font-weight: bold;
`;
