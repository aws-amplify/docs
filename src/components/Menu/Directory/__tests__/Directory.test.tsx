import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Directory from '../index';
import directory from '../../../../directory/directory';

describe('Directory', () => {
  const directoryKeys = Object.keys(directory);

  directoryKeys.forEach((directoryKey) => {
    it(`should render the ${directoryKey} Directory`, () => {
      const directoryObject = directory[directoryKey];
      const url = `/${directoryKey}`;

      render(<Directory url={url} filterKey="all" />);

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

  it('should throw an error for a missing url', () => {
    const consoleErrorFn = jest
      .spyOn(console, 'error')
      .mockImplementation(() => jest.fn());

    expect(() =>
      render(<Directory url={'missingUrl'} filterKey="all" />)
    ).toThrow(`Cannot read property 'productRoot' of undefined`);

    consoleErrorFn.mockRestore();
  });

  it(`should render the start Directory items`, () => {
    const directoryObject = directory[`start`];
    const url = `/start`;

    render(<Directory url={url} filterKey="all" />);

    const rootText = directoryObject['productRoot'].title;
    const itemsText = Object.values(directoryObject['items']).map((e) => {
      return { text: e.title, subItems: e.items };
    });

    const rootNode = screen.getByText(rootText);

    expect(rootNode).toBeTruthy();

    itemsText.forEach((textObject) => {
      const textNode = screen.getByText(textObject.text);
      expect(textNode).toBeTruthy();

      textObject.subItems.forEach((subItem) => {
        const subItemNode = screen.getByText(subItem.title);
        expect(subItemNode).toBeTruthy();
      });
    });
  });

  const filters = [
    'js',
    'react',
    'react-native',
    'angular',
    'vue',
    'next',
    'android',
    'ios',
    'flutter'
  ];
  filters.forEach((filter) => {
    it(`should render the ${filter} values`, () => {
      const directoryObject = directory[`start`];
      const url = `/start`;

      render(<Directory url={url} filterKey={filter} />);

      const rootText = directoryObject['productRoot'].title;
      const itemsText = Object.values(directoryObject['items']).map((e) => {
        return { text: e.title, subItems: e.items };
      });

      const rootNode = screen.getByText(rootText);

      expect(rootNode).toBeTruthy();

      itemsText.forEach((textObject) => {
        textObject.subItems.forEach((subItem) => {
          if (subItem.filters.includes(filter)) {
            const subItemNode = screen.getByText(subItem.title);
            expect(subItemNode).toBeTruthy();
          } else {
            const subItemNode = screen.queryByText(subItem.title);
            expect(subItemNode).not.toBeInTheDocument();
          }
        });
      });
    });
  });
});
