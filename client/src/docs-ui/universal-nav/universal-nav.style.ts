import {css} from "emotion";
import {MQFablet, MQLaptop} from "../../amplify-ui/styles/media";

export const universalNavStyle = css`
  display: block;
  background-color: var(--bg-color);
`;

export const universalNavContentStyle = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  width: 100%;
  transition: 0.25s ease all;
  padding: 0 0rem 0 1.5rem;

  span {
    color: var(--color-white);
    white-space: nowrap;
  }

  &.blend {
    background-color: transparent;

    * {
      color: var(--font-color);
    }

    stencil-route-link > a > span {
      color: var(--color-orange-hv);
    }
  }
`;

export const brandStyle = css`
  > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      height: 1rem;
      margin-right: 0.125rem;

      ${MQFablet} {
        height: 1.25rem;
      }
    }

    > span {
      margin-left: 0.25rem;
      font-size: 1rem;

      ${MQFablet} {
        font-size: 1.25rem;
      }
    }

    > sup {
      position: relative;
      top: -0.25rem;
      margin-left: 0.125rem;
      font-size: 0.5rem;
      font-weight: bold;
      color: var(--color-white);
    }
  }
`;

export const linksStyle = css`
  display: flex;
  flex-direction: row;
  padding-right: 1.5rem;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    font-size: 0.875rem;

    &:last-child {
      padding-right: 0;
    }
  }
`;

export const hideAboutLinkStyle = css`
  display: none;

  ${MQFablet} {
    display: initial;
  }
`;

// we use !important to override webkit's imposed border-radius
export const searchStyle = css`
  width: 100%;
  max-width: 500px;

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
        white-space: normal;
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
        border: 1px solid var(--amplify-grey)
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