import * as React from 'react';
import { render, screen } from '@testing-library/react';
import InlineFilter from '../index';

let routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: {}
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('InlineFilter', () => {
  const inlineContent = "Inline Content"

  it('should render the InlineFilter component', async () => {
    render(<InlineFilter filter="all">{<span>{inlineContent}</span>}</InlineFilter>);

    const inlineFilterNode = await screen.findByText(inlineContent);
    expect(inlineFilterNode).toBeInTheDocument();
  });

  it(`should display the inline content if the filter matches the query param`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "js"
        }
      };
    };

    render(<InlineFilter filter={"js"}><span>{inlineContent}</span></InlineFilter>);

    const inlineFilterNode = await screen.findByText(inlineContent);
    expect(inlineFilterNode).toBeInTheDocument();
  });

  it(`shouldn't display the inline content if the filter doesn't match the query param`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "js"
        }
      };
    };

    render(<InlineFilter filter={"android"}><span>{inlineContent}</span></InlineFilter>);

    await expect(screen.findByText(inlineContent)).rejects.toThrow();
  })

  it(`should fail to render if setting both filter and filters properties`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "js"
        }
      };
    };

    expect(() => render(<InlineFilter filter={"js"} filters={["js"]}><span>{inlineContent}</span></InlineFilter>)).toThrow()
  })

  it(`should fail to render if both filter and filters aren't set`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "js"
        }
      };
    };

    expect(() => render(<InlineFilter><span>{inlineContent}</span></InlineFilter>)).toThrow()
  })

  it(`should render the inline content when using multiple filters`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "react-native"
        }
      };
    };

    render(<InlineFilter filters={["js", "react-native"]}><span>{inlineContent}</span></InlineFilter>)

    const inlineFilterNode = await screen.findByText(inlineContent);
    expect(inlineFilterNode).toBeInTheDocument();
  });

  it(`shouldn't render the inilne content when using an invalid value with multiple filters`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "android"
        }
      };
    };

    render(<InlineFilter filters={["js", "react-native"]}><span>{inlineContent}</span></InlineFilter>)

    await expect(screen.findByText(inlineContent)).rejects.toThrow();
  });

  it(`shouldn't render when only passing an empty array to filters`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: "js"
        }
      };
    };

    expect(() => render(<InlineFilter filters={[]}><span>{inlineContent}</span></InlineFilter>)).toThrow()
  })
});
