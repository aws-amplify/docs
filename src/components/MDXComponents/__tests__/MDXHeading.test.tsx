import { render, screen } from '@testing-library/react';
import { MDXHeading } from '../MDXHeading';
import { TableOfContents } from '../../TableOfContents/index';
import userEvent from '@testing-library/user-event';

describe('MDXHeading', () => {
  it('should render H2 with string and anchor link', () => {
    const props = {
      level: 2,
      children: 'Test heading',
      id: 'test-heading'
    };
    render(<MDXHeading {...props} />);

    const heading = screen.queryByRole('heading', { level: 2 });
    const link = screen.queryByRole('link');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(props.children);
    expect(link).toHaveAttribute(
      'href',
      expect.stringMatching(/#test-heading/)
    );
  });

  it('should render H3 with string and anchor link', () => {
    const props = {
      level: 3,
      children: 'Test heading',
      id: 'test-heading'
    };
    render(<MDXHeading {...props} />);

    const heading = screen.queryByRole('heading', { level: 3 });
    const link = screen.queryByRole('link');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(props.children);
    expect(link).toHaveAttribute(
      'href',
      expect.stringMatching(/#test-heading/)
    );
  });

  it('should render H4 with string and no anchor link', () => {
    const props = {
      level: 4,
      children: 'Test heading',
      id: 'test-heading'
    };
    render(<MDXHeading {...props} />);

    const heading = screen.queryByRole('heading', { level: 4 });
    const link = screen.queryByRole('link');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(props.children);
    expect(link).not.toBeInTheDocument();
  });

  it('should shift focus to in-content heading on TOC click', async () => {
    const props = {
      level: 2,
      children: 'Test heading',
      id: 'test-heading'
    };
    render(<MDXHeading {...props} />);

    const heading = screen.queryByRole('heading', { level: 2 });
    const tocHeadings = [
      { linkText: 'Test heading', hash: 'test-heading', level: 'h2' }
    ];

    const tableOfContents = <TableOfContents headers={tocHeadings} />;
    render(tableOfContents);

    const tocEntry = await screen.findByRole('heading', {
      name: 'Test heading'
    });

    userEvent.click(tocEntry);
    expect(heading).toHaveFocus();
  });
});
