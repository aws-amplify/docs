import { useId, useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism, Highlight } from 'prism-react-renderer';
import { theme } from './code-theme';
import { Button, Flex, View, VisuallyHidden } from '@aws-amplify/ui-react';
import { versions } from '@/constants/versions';
import { trackCopyClicks } from '@/utils/track';
import type { MDXCodeProps } from './types';
import { TokenList } from './TokenList';

(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-java');
require('prismjs/components/prism-dart');
require('prismjs/components/prism-diff');
require('./cli-error-language.js');

const addVersions = (code: string) => {
  code = code.replace(/ANDROID_VERSION/g, versions.ANDROID_VERSION);
  code = code.replace(/ANDROID_DEVPREVIEW/g, versions.ANDROID_DEVPREVIEW);
  code = code.replace(/ANDROID_V1_VERSION/g, versions.ANDROID_V1_VERSION);
  code = code.replace(
    /ANDROID_V1_GEO_VERSION/g,
    versions.ANDROID_V1_GEO_VERSION
  );
  code = code.replace(
    /ANDROID_V1_KOTLIN_VERSION/g,
    versions.ANDROID_V1_KOTLIN_VERSION
  );
  code = code.replace(/ANDROID_SDK_VERSION/g, versions.ANDROID_SDK_VERSION);
  code = code.replace(/KOTLIN_SDK_VERSION/g, versions.KOTLIN_SDK_VERSION);
  return code;
};

export const MDXCode = ({
  codeString,
  language = 'js',
  showLineNumbers = true,
  testHeaderId,
  testId,
  title
}: MDXCodeProps) => {
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(codeString);
  const shouldShowCopy = language !== 'console';
  const shouldShowHeader = shouldShowCopy || title;
  const titleId = `${useId()}-titleID`;
  const codeId = `${useId()}-codeID`;

  const copy = () => {
    trackCopyClicks(codeString);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    setCode(addVersions(codeString));
  }, [codeString]);

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <View data-testid={testId}>
          <div style={{ display: 'none' }}>
            {/* searchable code \ */}
            {codeString}
          </div>
          <View className="pre-container">
            {shouldShowHeader ? (
              <Flex className="pre-header" data-testid={testHeaderId}>
                {title ? (
                  <View className="pre-title" id={titleId}>
                    {title}
                  </View>
                ) : null}
                {shouldShowCopy ? (
                  <CopyToClipboard text={codeString} onCopy={copy}>
                    <Button
                      size="small"
                      variation="link"
                      disabled={copied}
                      className="code-copy"
                      aria-describedby={title ? undefined : codeId}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                      <VisuallyHidden>{title} code example</VisuallyHidden>
                    </Button>
                  </CopyToClipboard>
                ) : null}
              </Flex>
            ) : null}
            <View className="pre-wrapper">
              <pre
                style={style}
                tabIndex={0}
                aria-label={`${title ? title : ''} code example`}
                aria-describedby={codeId}
                className={`pre${shouldShowHeader ? ' pre--header' : ''}`}
              >
                <code className="pre-code" id={codeId}>
                  <TokenList
                    showLineNumbers={showLineNumbers}
                    tokens={tokens}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                  />
                </code>
              </pre>
            </View>
          </View>
        </View>
      )}
    </Highlight>
  );
};
