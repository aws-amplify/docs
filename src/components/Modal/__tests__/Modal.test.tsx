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
      name: 'Introducing Amplify Gen 2'
    });

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('open');
  });

  it('should render Modal with no open attribute when gen2ModalDismissed exists in localStorage', async () => {
    window.localStorage.setItem(
      'gen2ModalDismissed',
      JSON.stringify({ data: 'true' })
    );

    render(<Modal />);

    /* We have to pass hidden option here because jest considers the dialog to be hidden */
    const modal = screen.getByRole('dialog', { hidden: true });

    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveAttribute('open');
  });

  it('should set gen2ModalDismissed in localStorage when close button clicked', async () => {
    render(<Modal />);

    const closeButton = await screen.findByRole('button', {
      name: 'Dismiss Gen 2 introduction dialog'
    });

    userEvent.click(closeButton);
    expect(localStorage.getItem('gen2ModalDismissed')).toEqual('true');
  });

  it('should render Gen 1 link if isGen1 is false (default)', async () => {
    render(<Modal />);

    const gen1Link = screen.getByRole('link', {
      name: 'Back to Gen 1 Docs'
    });

    expect(gen1Link).toBeInTheDocument();
  });

  it('should not render Gen 1 link if isGen1 is true', async () => {
    render(<Modal isGen1={true} />);

    const gen1Link = screen.queryByRole('link', {
      name: 'Back to Gen 1 Docs'
    });

    expect(gen1Link).toBeNull();
  });
});
