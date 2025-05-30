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
  code = code.replace(
    /ANDROID_APPSYNC_SDK_VERSION/g,
    versions.ANDROID_APPSYNC_SDK_VERSION
  );
  return code;
};

const hasHighlights = (code: string): boolean => {
  const highlightableStrings = [
    '// highlight-start',
    '// highlight-end',
    '// highlight-next-line'
  ];
  if (highlightableStrings.some((highlight) => code.includes(highlight))) {
    return true;
  }
  return false;
};

export const emptyCodeString = 'Codeblock must contain a non empty code string';

export const MDXCode = ({
  codeString,
  language = 'js',
  showLineNumbers,
  testHeaderId,
  testId,
  title
}: MDXCodeProps) => {
  if (!codeString || !codeString.trim()) {
    throw new Error(emptyCodeString);
  }
  const [code, setCode] = useState(codeString);
  const shouldShowCopy = language !== 'console' && !hasHighlights(codeString);
  const shouldShowHeader = shouldShowCopy || title;
  const titleId = `${useId()}-titleID`;
  const codeId = `${useId()}-codeID`;
  const hideLineNumbers = ['bash'];
  const defaultLineNumberValue = !hideLineNumbers.includes(language); //show line number by default for bash language
  const showLineNumberValue =
    showLineNumbers === undefined ? defaultLineNumberValue : showLineNumbers;

  useEffect(() => {
    setCode(addVersions(codeString));
  }, [codeString]);

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <View data-testid={testId} className={'code-block'}>
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
                    showLineNumbers={showLineNumberValue}
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
