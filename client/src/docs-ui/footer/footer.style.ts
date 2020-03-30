import {css} from "emotion";
import {MQLaptop} from "../../amplify-ui/styles/media";

export const footerContainerStyle = css`
  background-color: var(--color-ink-hv);
`;

export const footerStyle = css`
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${MQLaptop} {
    flex-direction: row;
  }
`;

export const leftLinkContainerStyle = css`
  display: flex;
  flex-direction: row;

  img {
    margin-right: 2rem;
    width: 2rem;
    height: 2rem;
  }

  h3 {
    margin-top: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    align-items: flex-start;

    a {
      white-space: nowrap;
      color: var(--color-white);
    }
  }
`;

export const rightLinkContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 3rem;

  ${MQLaptop} {
    margin-top: 0;
  }
`;

export const legalStyle = css`
  max-width: 24rem;

  img {
    height: 0.5rem;
    display: inline-block;
    margin-right: 0.25rem;
  }

  display: flex;
  flex-direction: row;
  text-align: right;
  font-size: 0.75rem;
  line-height: 1.125rem;
`;

export const socialLinkContainerStyle = css`
  display: flex;
  flex-direction: row;

  amplify-external-link {
    margin-left: 0.75rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
