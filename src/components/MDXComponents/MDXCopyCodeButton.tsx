import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { trackCopyClicks } from '@/utils/track';
import { prepareCopyText } from './utils/copy-code';
import { IconClipboard } from '@/components/Icons';
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

  const copyText = prepareCopyText(codeString);

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
        className="code-copy"
        testId={testId}
        aria-describedby={codeId}
      >
        <IconClipboard /> {copied ? 'Copied!' : 'Copy'}
        <VisuallyHidden>
          {` `}
          {title} code example
        </VisuallyHidden>
      </Button>
    </CopyToClipboard>
  );
};
