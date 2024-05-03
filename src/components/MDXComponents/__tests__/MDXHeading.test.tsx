import { render, screen } from '@testing-library/react';
import { MDXHeading } from '../MDXHeading';

describe('MDXHeading', () => {
  it('should render H2 with string and anchor link', () => {
    const props = {
      level: 2,
      children: 'Test heading'
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
      children: 'Test heading'
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
      children: 'Test heading'
    };
    render(<MDXHeading {...props} />);

    const heading = screen.queryByRole('heading', { level: 4 });
    const link = screen.queryByRole('link');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(props.children);
    expect(link).not.toBeInTheDocument();
  });

  it('should render H2 with HTML code element and anchor link', () => {
    const props = {
      level: 2,
      children: <code>runtime</code>
    };
    render(<MDXHeading {...props} />);

    const heading = screen.queryByRole('heading', { level: 2 });
    const link = screen.queryByRole('link', { name: 'runtime' });
    expect(heading).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringMatching(/#runtime/));
  });

  it('should render H2 with mixed elements and anchor link', () => {
    render(
      <MDXHeading level={2}>
        <code>runtime</code> and <code>test</code>
      </MDXHeading>
    );

    const heading = screen.queryByRole('heading', { level: 2 });
    const link = screen.queryByRole('link', { name: 'runtime and test' });
    expect(heading).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      expect.stringMatching(/#runtime-and-test/)
    );
  });
});
