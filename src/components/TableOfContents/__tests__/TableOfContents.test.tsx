import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TableOfContents } from '../index';

describe('TableOfContents', () => {
  const tocHeadings = [
    { linkText: 'Heading One', hash: 'heading-one', level: 'h2' },
    { linkText: 'Heading Two', hash: 'heading-two', level: 'h3' },
    { linkText: 'Heading Three', hash: 'heading-three', level: 'h3' }
  ];
  const component = <TableOfContents headers={tocHeadings} />;

  it('should render the TableOfContents component', async () => {
    render(component);
    const tocNode = await screen.findByText('Heading One');
    expect(tocNode).toBeInTheDocument();
  });

  it('should display linkText as TOC entry', async () => {
    render(component);
    const tocEntry = await screen.findByText('Heading Two');
    expect(tocEntry.textContent).toEqual(tocHeadings[1].linkText);
  });

  it('should have anchor link from linkText', async () => {
    render(component);
    const tocEntry = await screen.findByText('Heading Three');
    const tocHash = tocEntry.href.slice(tocEntry.href.indexOf('#'));
    expect(tocHash).toEqual('#heading-three');
  });

  it('should render correct heading level', async () => {
    render(component);
    const tocEntry = await screen.findByText('Heading One');
    expect(tocEntry.className).toContain('h2');
  });
});
