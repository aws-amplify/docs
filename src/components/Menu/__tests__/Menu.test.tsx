import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from '../index';
import directory from '../../../directory/directory.mjs';

jest.mock('../RepoActions', () => () => <div>Repo Actions</div>);
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const directoryKeys = Object.keys(directory);

describe('Menu', () => {
  directoryKeys.forEach((directoryKey) => {
    it(`should render the Menu component with the ${directoryKey} key`, async () => {
      const url = `/${directoryKey}`;
      render(
        <Menu
          filters={[]}
          filterKey={'all'}
          filterKind={''}
          url={url}
          directoryPath={directoryKey}
          buttonsRef
        />
      );

      const directoryObject = directory[directoryKey];
      const rootText = directoryObject['productRoot'].title;
      const itemsText = Object.values(directoryObject['items']).map(
        (e) => e.title
      );

      const rootNode = screen.getByText(rootText);

      expect(rootNode).toBeTruthy();

      itemsText.forEach((text) => {
        const textNode = screen.getByText(text);
        expect(textNode).toBeTruthy();
      });
    });
  });
});
