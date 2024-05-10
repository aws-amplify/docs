import { useState, useId } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { trackCopyClicks } from '@/utils/track';
import { prepareCopyText } from './utils/copy-code';

interface MDXCopyCodeButtonProps {
  codeId: string;
  codeString: string;
  testId?: string;
  title?: string;
  children?: React.ReactNode;
}

export const MDXHighlightedCopyCodeButton = ({
  codeString,
  title,
  codeId,
  children
}: MDXCopyCodeButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyText = prepareCopyText(codeString);
  const highlightCodeId = useId();

  const copy = () => {
    trackCopyClicks(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <>
      <CopyToClipboard text={copyText} onCopy={copy}>
        <Button
          aria-describedby={highlightCodeId}
          size="small"
          className="highlight-copy-button"
          key={codeId}
        >
          <span className="highlight-copy-block-hint">
            {copied ? 'Copied' : 'Copy'}
          </span>
          <VisuallyHidden>
            {` `}
            {title} highlighted code example
          </VisuallyHidden>
        </Button>
      </CopyToClipboard>
      <CopyToClipboard text={copyText} onCopy={copy}>
        <div className="highlight-code" id={highlightCodeId}>
          {children}
        </div>
      </CopyToClipboard>
    </>
  );
};
