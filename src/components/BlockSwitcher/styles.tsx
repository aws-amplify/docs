import styled from "@emotion/styled";

type TabProps = {
  active?: boolean;
};

export const HostStyle = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  background-color: white;
  border: 0.0625rem solid var(--border-color);
  border-radius: 0.25rem;
  > pre {
    display: none;
  }
`;

export const TabStyle = styled.button<TabProps>(({active}) => {
  return `
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    height: 100%;
    appearance: none;
    background-color: transparent;
    padding: 0.75rem 1rem 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    
    ${active &&
      `
      font-weight: 700;
      border-bottom: 0.25rem solid var(--primary-color);
    `}
  `;
});

export const TabContainerStyle = styled.div`
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-bottom: 0.0625rem solid var(--border-color);
`;

export const SwitcherContentStyle = styled.div`
  padding: 1rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;

  > div > div > pre:last-child {
    margin-bottom: 0;
  }
`;
