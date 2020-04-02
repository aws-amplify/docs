import {css} from "emotion";
import {MQLaptop} from "../../amplify-ui/styles/media";

export const secondaryNavStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: center;

  ${MQLaptop} {
    flex-direction: row;
    padding-left: 1.5rem;
  }

  * {
    white-space: nowrap;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    &:first-child {
      width: 100%;
      overflow-x: auto;

      > div {
        display: flex;
        flex-direction: row;
        padding: 0 1rem;
      }
    }

    docs-internal-link,
    amplify-external-link {
      margin-left: 1.75rem;

      &:first-child {
        margin-left: 0;
      }

      a {
        display: block;
        padding: 0.875rem 0 0.875rem;
        color: var(--font-color);
      }
    }
  }
`;

export const spanStyle = css`
  color: var(--font-color-secondary);
`;

export const linkActiveStyle = css`
  > a {
    font-weight: bold;

    ${MQLaptop} {
      border-bottom: 0.125rem solid var(--font-color);
    }

    > span {
      color: var(--font-color);
    }
  }
`;

export const hostStyle = css`
  z-index: 1;
  display: block;
  position: sticky;
  top: 0;
  background-color: var(--bg-color-secondary);
  padding-bottom: 1rem;

  ${MQLaptop} {
    padding: 0;
  }
`;

// we use !important to override webkit's imposed border-radius
export const searchStyle = css`
  width: 100%;

  ${MQLaptop} {
    width: initial;
    margin: 0 1rem;
  }

  > div {
    width: 100%;
    padding: 0 1rem;

    > div {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      position: relative;

      .algolia-autocomplete {
        display: block;
        width: 100%;
      }
      
      .algolia-autocomplete .ds-dropdown-menu * {
        white-space: normal
      }

      .algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column-text {
        white-space: normal;
      }
      
      .algolia-autocomplete .algolia-docsearch-suggestion--content > .algolia-docsearch-suggestion--text > .algolia-docsearch-suggestion--highlight {
        box-shadow: inset 0 -2px 0 0 var(--color-orange-hv)
      }

      .algolia-autocomplete .algolia-docsearch-suggestion--title {
        font-weight: bold;
        color: black;
      }

      .algolia-autocomplete .algolia-docsearch-suggestion--text {
        font-size: 0.8rem;
        color: gray;
      }

      .ds-cursor .algolia-docsearch-suggestion--content {
        background-color: var(--bg-color-hover) !important;
      }
      
      .algolia-autocomplete .algolia-docsearch-suggestion--highlight {
        color: var(--color-orange-hv);
        background: var(--bg-color-hover);
      }

      input {
        position: relative;
        display: flex;
        flex: 1;
        width: 100%;
        height: 2rem;
        border-radius: 0.25rem !important;
        padding: 0 1.75rem 0 0.75rem;
        min-width: 15rem;
        -webkit-appearance: none;
        appearance: none;
      }

      img {
        position: absolute;
        right: 0.5rem;
        width: 0.75rem;
        opacity: 0.5;
      }
    }
  }
`;

export const ghostItemStyle = css`
  display: block;
  width: 1rem;
  height: 100%;
`;
