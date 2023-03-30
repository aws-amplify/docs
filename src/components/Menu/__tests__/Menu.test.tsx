import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from '../index';
import directory from '../../../directory/directory.mjs';

jest.mock('../RepoActions', () => () => <div>Repo Actions</div>);
Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: true
    };
  }
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
