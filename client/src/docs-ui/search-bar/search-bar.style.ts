import {MQLaptop} from "../../amplify-ui/styles/media";
import {css} from "emotion";

// we use !important to override webkit's imposed border-radius
export const searchStyle = css`
  width: 100%;
  ${MQLaptop} {
    width: initial;
  }
  .algolia-autocomplete .ds-dropdown-menu {
    min-width: initial;
    ${MQLaptop} {
      min-width: 31.25rem;
    }
  }
  > div {
    width: 100%;
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
        white-space: normal;
      }
      .algolia-autocomplete .ds-dropdown-menu [class^="ds-dataset-"] {
        max-height: calc(100vh - 100px);
      }
      .algolia-autocomplete
        .algolia-docsearch-suggestion--subcategory-column-text {
        white-space: normal;
      }
      .algolia-autocomplete
        .algolia-docsearch-suggestion--content
        > .algolia-docsearch-suggestion--text
        > .algolia-docsearch-suggestion--highlight {
        box-shadow: inset 0 -2px 0 0 var(--color-orange-hv);
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
      .algolia-docsearch-suggestion--category-header-lvl0 {
        color: initial;
      }
      .algolia-docsearch-suggestion--subcategory-column-text {
        color: initial;
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
