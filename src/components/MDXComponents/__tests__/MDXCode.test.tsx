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
  it('can render MDXCode', async () => {
    render(
      <div>
        <MDXCode testId="mdxCode" codeString={codeString}></MDXCode>
      </div>
    );
    const codeBlock = await screen.findByTestId('mdxCode');
    expect(codeBlock).toBeInTheDocument();
  });

  it('can render MDXCode with a title', async () => {
    const title = 'src/app.tsx';
    render(
      <div>
        <MDXCode
          testId="mdxCode"
          title={title}
          codeString={codeString}
        ></MDXCode>
      </div>
    );
    const codeBlock = await screen.findByTestId('mdxCode');
    expect(codeBlock).toBeInTheDocument();
  });
});
