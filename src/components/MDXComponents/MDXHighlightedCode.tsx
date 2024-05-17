import { useState, useId } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { trackCopyClicks } from '@/utils/track';
import { prepareCopyText } from './utils/copy-code';
import { IconClipboard } from '@/components/Icons';
interface MDXHighlightedCodeProps {
  codeString: string;
  testId?: string;
  children?: React.ReactNode;
}

export const MDXHighlightedCode = ({
  codeString,
  children
}: MDXHighlightedCodeProps) => {
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
        >
          <IconClipboard />
          {copied ? 'Copied' : 'Copy'}

          <VisuallyHidden>
            {` `}
            highlighted code example
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
