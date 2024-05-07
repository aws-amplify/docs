import { useId, useState, useEffect } from 'react';
import { Prism, Highlight } from 'prism-react-renderer';
import { theme } from './code-theme';
import { Flex, View } from '@aws-amplify/ui-react';
import { versions } from '@/constants/versions';
import type { MDXCodeProps } from './types';
import { TokenList } from './TokenList';
import { MDXCopyCodeButton } from './MDXCopyCodeButton';

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
  code = code.replace(
    /ANDROID_AUTHENTICATOR_VERSION/g,
    versions.ANDROID_AUTHENTICATOR_VERSION
  );
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
  const [code, setCode] = useState(codeString);
  const shouldShowCopy = language !== 'console';
  const shouldShowHeader = shouldShowCopy || title;
  const titleId = `${useId()}-titleID`;
  const codeId = `${useId()}-codeID`;

  useEffect(() => {
    setCode(addVersions(codeString));
  }, [codeString]);

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <View data-testid={testId}>
          <View className="pre-container">
            {shouldShowHeader ? (
              <Flex className="pre-header" data-testid={testHeaderId}>
                {title ? (
                  <View className="pre-title" id={titleId}>
                    {title}
                  </View>
                ) : null}
                {shouldShowCopy ? (
                  <MDXCopyCodeButton
                    codeString={codeString}
                    title={title}
                    codeId={codeId}
                  />
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
