import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MDXCode } from '../MDXCode';

const codeString = `
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

const backend = defineBackend({
  auth,
  data
});

const customResourceStack = backend.createStack('MyCustomResources');

new sqs.Queue(customResourceStack, 'CustomQueue');
new sns.Topic(customResourceStack, 'CustomTopic');
`;

describe('MDXCode', () => {
  const testId = 'testId';
  it('can render MDXCode', async () => {
    render(<MDXCode testId={testId} codeString={codeString}></MDXCode>);
    const codeBlock = await screen.findByTestId(testId);
    expect(codeBlock).toBeInTheDocument();
  });

  it('can render MDXCode with a title', async () => {
    const title = 'src/app.tsx';
    render(
      <MDXCode testId="mdxCode" title={title} codeString={codeString}></MDXCode>
    );
    const titleElement = await screen.findByText(title);
    expect(titleElement.nodeName).toBe('DIV');
    expect(titleElement.className).toContain('pre-title');
  });

  it('should show a copy button for supported languages', async () => {
    render(<MDXCode codeString={codeString}></MDXCode>);
    const copyButton = await screen.findByRole('button', { name: /Copy/i });
    expect(copyButton).toBeTruthy();
  });

  it('should not show a copy button for unsupported languages', async () => {
    render(<MDXCode language="console" codeString={codeString}></MDXCode>);
    const copyButton = screen.queryByRole('button', { name: /Copy/i });
    expect(copyButton).toBeNull();
  });

  it('should not have a header if no title and is unsupported language', async () => {
    const testHeaderId = 'testHeader';
    render(
      <MDXCode
        testHeaderId={testHeaderId}
        language="console"
        codeString={codeString}
      ></MDXCode>
    );
    const header = screen.queryByTestId('default');
    expect(header).not.toBeInTheDocument();
  });

  it('should show line numbers by default', async () => {
    const codeString = 'test code';
    render(<MDXCode codeString={codeString}></MDXCode>);
    const number = screen.queryByText('1');
    expect(number).toBeInTheDocument();
  });

  it('should not have line numbers if showLineNumbers is false', async () => {
    const codeString = 'test code';
    render(<MDXCode showLineNumbers={false} codeString={codeString}></MDXCode>);
    const number = screen.queryByText('1');
    expect(number).not.toBeInTheDocument();
  });

  it('should have highlighted line when //highlight-next-line is used', async () => {
    const codeString = `{
  "data": {
    // highlight-next-line
    "searchStudents": {
      "aggregateItems": [{
        "name": "averageExams",
        "result": {
          "value": 17.3
        }
      }]
    }
  }
}
    `;
    const { container } = render(
      <MDXCode language="graphql" codeString={codeString}></MDXCode>
    );

    // Check that highlight comment is not output
    const highlightNextLineComment = screen.queryByText(
      '// highlight-next-line'
    );
    expect(highlightNextLineComment).not.toBeInTheDocument();

    // Check that correct highlighted line has highlight class
    const highlightedLines = container.getElementsByClassName('line-highlight');
    expect(highlightedLines).toHaveLength(1);
    expect(highlightedLines[0]).toContainHTML('searchStudents');
  });
  it('should have highlighted lines when //highlight-start/end is used', async () => {
    const codeString = `{
  "data": {
    "searchStudents": {
      "aggregateItems": [{
        "name": "averageExams",
        // highlight-start
        "result": {
          "value": 17.3
        }
        // highlight-end
      }]
    }
  }
}
    `;
    const { container } = render(
      <MDXCode language="graphql" codeString={codeString}></MDXCode>
    );

    // Check that highlight comments are not in output
    const highlightStartComment = screen.queryByText('// highlight-start');
    const highlightEndComment = screen.queryByText('// highlight-end');
    expect(highlightStartComment).not.toBeInTheDocument();
    expect(highlightEndComment).not.toBeInTheDocument();

    // Check that correct highlighted lines have highlight class
    const highlightedLines = container.getElementsByClassName('line-highlight');
    expect(highlightedLines).toHaveLength(3);
    expect(highlightedLines[0]).toContainHTML('result');
    expect(highlightedLines[1]).toContainHTML('value');
    expect(highlightedLines[2]).toContainHTML('}');
  });
});
