import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MDXCopyCodeButton } from '../MDXCopyCodeButton';
import userEvent from '@testing-library/user-event';
import * as trackModule from '../../../utils/track';
import { prepareCopyText } from '../utils/copy-code';

const codeString = `
import * as sns from 'aws-cdk-lib/aws-sns';

// highlight-next-line
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

// highlight-start
const backend = defineBackend({
  auth,
  data
});
// highlight-end

const customResourceStack = backend.createStack('MyCustomResources');

new sqs.Queue(customResourceStack, 'CustomQueue');
new sns.Topic(customResourceStack, 'CustomTopic');
`;

const title = 'src/app.tsx';
const codeId = 'codeId';
const testId = 'copyButton';

jest.mock('../../../utils/track', () => ({
  trackCopyClicks: jest.fn().mockImplementation(() => codeString)
}));

jest.mock('copy-to-clipboard', () => {
  return jest.fn();
});

describe('MDXCopyCodeButton', () => {
  it('should render MDXCopyCodeButton', async () => {
    render(
      <MDXCopyCodeButton
        codeString={codeString}
        codeId={codeId}
        testId={testId}
        title={title}
      />
    );
    const copyButton = await screen.findByTestId(testId);
    expect(copyButton).toBeInTheDocument();
  });

  it('should track CopyCodeButton on click', async () => {
    jest.spyOn(trackModule, 'trackCopyClicks');
    render(
      <MDXCopyCodeButton
        codeString={codeString}
        codeId={codeId}
        testId={testId}
        title={title}
      />
    );
    const copyButton = await screen.findByTestId(testId);
    userEvent.click(copyButton);

    await waitFor(() => {
      expect(trackModule.trackCopyClicks).toHaveBeenCalled();
    });
  });

  it('should use aria-describedBy if no title is supplied', async () => {
    render(
      <MDXCopyCodeButton
        codeString={codeString}
        codeId={codeId}
        testId={testId}
      />
    );
    const copyButton = await screen.findByTestId(testId);
    expect(copyButton).toHaveAttribute('aria-describedby', codeId);
  });
});

describe('prepareCopyText', () => {
  it('should return code string without markdown comments', () => {
    const copyText = prepareCopyText(codeString);
    expect(copyText.indexOf('// highlight-next-line')).toEqual(-1);
    expect(copyText.indexOf('// highlight-start')).toEqual(-1);
    expect(copyText.indexOf('// highlight-end')).toEqual(-1);
  });
});
