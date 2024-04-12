import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { VisuallyHidden } from '@aws-amplify/ui-react';
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

  const copy = () => {
    trackCopyClicks(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <CopyToClipboard text={copyText} onCopy={copy}>
      <button className="highlight-copy-block" key={codeId}>
        {children}
        <span className="highlight-copy-block-hint">
          {copied ? 'Copied' : 'Copy'}
        </span>
        <VisuallyHidden>
          {` `}
          {title} highlighted code example
        </VisuallyHidden>
      </button>
    </CopyToClipboard>
  );
};
