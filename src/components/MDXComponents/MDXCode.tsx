import { useId, useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism, Highlight } from 'prism-react-renderer';
import { theme } from './code-theme';
import { Button, Flex, View, VisuallyHidden } from '@aws-amplify/ui-react';
import { versions } from '@/constants/versions';
import { trackCopyClicks } from '@/utils/track';
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

interface MDXCodeProps {
  /**
   * @desc string of code to show in the code block
   */
  codeString: string;

  /**
   * @desc language of code
   */
  language?: string;

  /**
   * @desc shows as a title above the code. markdown users can
   * use ```js title="some title" to add a fileName
   */
  title?: string;
  highlight?: string;
  showLineNumbers?: boolean;
}

export const MDXCode = (props: MDXCodeProps) => {
  const {
    codeString,
    language = 'js',
    title,
    highlight,
    showLineNumbers = true
  } = props;

  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(codeString);
  const shouldShowCopy = language !== 'console';
  const shouldShowHeader = shouldShowCopy || title;
  const titleId = useId();
  const codeId = useId();

  const copy = () => {
    trackCopyClicks(codeString);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  let lineHighlightArray: number[] = [];
  if (highlight) {
    const highlightArray: string[] = highlight.split(',');
    highlightArray.forEach((highlightFragment) => {
      if (highlightFragment.includes('-')) {
        const fragmentBoundsArray = highlightFragment.split('-');
        const fragmentBounds: number[] = [];
        fragmentBoundsArray.forEach((fragment, index) => {
          fragmentBounds[index] = parseInt(fragment);
        });
        for (
          let fragmentIndex = fragmentBounds[0];
          fragmentIndex <= fragmentBounds[1];
          fragmentIndex++
        ) {
          lineHighlightArray.push(fragmentIndex);
        }
      } else {
        lineHighlightArray.push(parseInt(highlightFragment));
      }
    });
  }

  useEffect(() => {
    setCode(addVersions(codeString));
  }, []);

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <View>
          <div style={{ display: 'none' }}>
            {/* searchable code \ */}
            {codeString}
          </div>
          <View className="pre-container">
            {shouldShowHeader ? (
              <Flex className="pre-header">
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
                    >
                      <VisuallyHidden>Copy example code</VisuallyHidden>
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </CopyToClipboard>
                ) : null}
              </Flex>
            ) : null}
            <View className="pre-wrapper">
              <pre
                style={style}
                tabIndex={0}
                aria-labelledby={`${title ? titleId : null} ${codeId}`}
                className={`pre${shouldShowHeader ? ' pre--header' : ''}`}
              >
                <code className="pre-code" id={codeId}>
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      className={`token-line${
                        lineHighlightArray.includes(i + 1)
                          ? ' line-highlight'
                          : ''
                      }`}
                    >
                      {showLineNumbers && (
                        <span className="line-number">{i + 1}</span>
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            </View>
          </View>
        </View>
      )}
    </Highlight>
  );
};
