import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '../Modal';
import userEvent from '@testing-library/user-event';

const routerMock = {
  __esModule: true,

  useRouter: () => {
    return {
      query: {
        platform: 'react'
      }
    };
  }
};

jest.mock('next/router', () => routerMock);

/* Mock local storage */
const mockLocalStorage = (function () {
  let store = {};
  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: Storage) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Modal', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should render Modal with open attribute', async () => {
    render(<Modal />);

    const modal = screen.getByRole('dialog', {
      name: 'Introducing AWS Blocks'
    });

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('open');
  });

  it('should render Modal with no open attribute when awsBlocksModalDismissed exists in localStorage', async () => {
    window.localStorage.setItem(
      'awsBlocksModalDismissed',
      JSON.stringify({ data: 'true' })
    );

    render(<Modal />);

    /* We have to pass hidden option here because jest considers the dialog to be hidden */
    const modal = screen.getByRole('dialog', { hidden: true });

    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveAttribute('open');
  });

  it('should set awsBlocksModalDismissed in localStorage when close button clicked', async () => {
    render(<Modal />);

    const closeButton = await screen.findByRole('button', {
      name: 'Dismiss AWS Blocks introduction dialog'
    });

    userEvent.click(closeButton);
    expect(localStorage.getItem('awsBlocksModalDismissed')).toEqual('true');
  });

  it('should render an internal link to the AWS Blocks docs section', async () => {
    render(<Modal />);

    const blocksLink = screen.getByRole('link', {
      name: /Explore Blocks with Amplify/
    });

    expect(blocksLink).toBeInTheDocument();
  });

  it('should render an external link to get started with Blocks', async () => {
    render(<Modal />);

    const awsLink = screen.getByRole('link', {
      name: /Get Started with Blocks/
    });

    expect(awsLink).toHaveAttribute(
      'href',
      'https://docs.aws.amazon.com/blocks/latest/devguide/what-is-blocks.html'
    );
  });
});
