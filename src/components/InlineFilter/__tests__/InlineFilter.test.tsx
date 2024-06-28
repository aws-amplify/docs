import * as React from 'react';
import { render, screen } from '@testing-library/react';
import InlineFilter from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: {}
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('InlineFilter', () => {
  const inlineContent = 'Inline Content';

  it('should render the InlineFilter component', async () => {
    render(
      <InlineFilter filters={['all']}>
        {<span>{inlineContent}</span>}
      </InlineFilter>
    );

    const inlineFilterNode = await screen.findByText(inlineContent);
    expect(inlineFilterNode).toBeInTheDocument();
  });

  it(`should render the inline content when using multiple filters`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react-native'
        }
      };
    };

    render(
      <InlineFilter filters={['javascript', 'react-native']}>
        <span>{inlineContent}</span>
      </InlineFilter>
    );

    const inlineFilterNode = await screen.findByText(inlineContent);
    expect(inlineFilterNode).toBeInTheDocument();
  });

  it(`shouldn't render the inline content when using an invalid value with multiple filters`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'android'
        }
      };
    };

    render(
      <InlineFilter filters={['javascript', 'react-native']}>
        <span>{inlineContent}</span>
      </InlineFilter>
    );

    await expect(screen.findByText(inlineContent)).rejects.toThrow();
  });

  it(`shouldn't render when only passing an empty array to filters`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'js'
        }
      };
    };

    const { container } = render(
      <InlineFilter filters={[]}>
        <span>{inlineContent}</span>
      </InlineFilter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it(`should render the nested inlinefilter content`, async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'javascript'
        }
      };
    };

    const inlineContentForJs = 'Inline content for javascript';
    const inlineContentForAll =
      'Inline content for javascript and react native';

    render(
      <InlineFilter filters={['javascript', 'react-native']}>
        <InlineFilter filters={['javascript']}>
          <span>{inlineContentForJs}</span>
        </InlineFilter>
        <span>{inlineContentForAll}</span>
      </InlineFilter>
    );

    const inlineJsFilterNode = await screen.findByText(inlineContentForJs);
    const inlineAllFilterNode = await screen.findByText(inlineContentForAll);

    expect(inlineJsFilterNode).toBeInTheDocument();
    expect(inlineAllFilterNode).toBeInTheDocument();
  });

  it('should not render the nested inlinefilter content when using multiple filters', async () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react-native'
        }
      };
    };

    const inlineContentForJs = 'Inline content for javascript';
    const inlineContentForAll =
      'Inline content for javascript and react native';

    render(
      <InlineFilter filters={['javascript', 'react-native']}>
        <InlineFilter filters={['javascript']}>
          <span>{inlineContentForJs}</span>
        </InlineFilter>
        <span>{inlineContentForAll}</span>
      </InlineFilter>
    );

    const inlineJsFilterNode = await screen.queryByText(inlineContentForJs);
    const inlineAllFilterNode = await screen.findByText(inlineContentForAll);

    expect(inlineJsFilterNode).not.toBeInTheDocument();
    expect(inlineAllFilterNode).toBeInTheDocument();
  });
});
