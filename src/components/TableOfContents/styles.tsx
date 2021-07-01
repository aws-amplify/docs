import styled from "@emotion/styled";
import {MQTablet, MQDesktop} from "../media";

export const TOCStyle = styled.div`
  display: none;
  flex-direction: column;
  padding: 2rem 0;
  font-size: 0.875rem;
  min-width: 16.875rem;

  ${MQTablet} {
    &.more-width {
      display: flex;
    }
  }

  ${MQDesktop} {
    display: flex;
  }

  a {
    transition: 0.25s ease;
    transition-property: margin-left border;
    border-left: 0.05rem solid var(--border-color);
    display: flex;
    flex: 1;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-right: 1.5rem;
    color: var(--font-color);

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

export const H2AnchorStyle = styled.div`
  a {
    padding-left: 1.5rem;
  }
`;

export const H3AnchorStyle = styled.div`
  a {
    padding-left: 2rem !important;
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }
`;

export const HeaderStyle = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  border-left: 0.05rem solid var(--border-color);
`;
