import {css} from "emotion";
import {MQTablet, MQDesktop} from "../../styles/media";

export const tocStyle = css`
  display: none;
  flex-direction: column;
  padding: 2rem 0;
  font-size: 0.875rem;
  width: 16.875rem;

  ${MQTablet} {
    &.more-width {
      display: flex;
    }
  }

  ${MQDesktop} {
    display: flex;
  }

  docs-in-page-link {
    transition: 0.25s ease;
    transition-property: margin-left border;
    border-left: 0.05rem solid var(--border-color);
    display: flex;

    a {
      display: flex;
      flex: 1;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      padding-right: 1.5rem;
      color: var(--font-color);
    }

    &:hover {
      background-color: var(--bg-color-hover);
    }

    &:first-child {
      margin-top: 0;
    }

    &.active {
      border-left-color: var(--color-anchor);

      a {
        color: var(--color-anchor);
      }
    }
  }
`;

export const h2AnchorStyle = css`
  a {
    padding-left: 1.5rem;
  }
`;

export const h3AnchorStyle = css`
  a {
    padding-left: 2rem !important;
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }
`;

export const headerStyle = css`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  border-left: 0.05rem solid var(--border-color);
`;
