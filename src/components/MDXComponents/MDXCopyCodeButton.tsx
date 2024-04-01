import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { trackCopyClicks } from '@/utils/track';

interface MDXCopyCodeButtonProps {
  codeId: string;
  codeString: string;
  testId?: string;
  title?: string;
}

export const MDXCopyCodeButton = ({
  codeString,
  title,
  codeId,
  testId
}: MDXCopyCodeButtonProps) => {
  const [copied, setCopied] = useState(false);

  // We need to strip out markdown comments from the code string
  // so they don't show up in our copied text
  const highlightStartText = /\/\/\s?highlight-start/g;
  const highlightEndText = /\/\/\s?highlight-end/g;
  const highlightNextLine = /\/\/\s?highlight-next-line/g;

  const copyText = codeString
    .replace(highlightStartText, '')
    .replace(highlightEndText, '')
    .replace(highlightNextLine, '');

  const copy = () => {
    trackCopyClicks(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <CopyToClipboard text={copyText} onCopy={copy}>
      <Button
        size="small"
        variation="link"
        disabled={copied}
        className="code-copy"
        testId={testId}
        aria-describedby={title ? undefined : codeId}
      >
        {copied ? 'Copied!' : 'Copy'}
        <VisuallyHidden>
          {` `}
          {title} code example
        </VisuallyHidden>
      </Button>
    </CopyToClipboard>
  );
};
