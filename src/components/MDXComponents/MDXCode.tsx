import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism, Highlight } from 'prism-react-renderer';
import classNames from 'classnames';
import { View, Text, Button } from '@aws-amplify/ui-react';
import { versions } from '@/constants/versions';

require('./cli-error-language.js');

// TODO: Port over styles

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

export const MDXCode = (props) => {
  const { codeString, language } = props;
  const [copied, setCopied] = React.useState(false);
  const [code, setCode] = React.useState(codeString);
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  React.useEffect(() => {
    setCode(addVersions(codeString));
  }, []);

  return (
    <Highlight code={code} language={language}>
      {({
        className: prismClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps
      }) => (
        <>
          <div style={{ display: 'none' }}>
            {/* searchable code */}
            {codeString}
          </div>
          <View
            position="relative"
            padding="medium"
            border="1px solid var(--amplify-colors-neutral-20"
          >
            <View
              as="pre"
              marginBottom="0"
              className={classNames(prismClassName, 'with-lines')}
            >
              <View as="code" className={classNames(prismClassName)}>
                {tokens.map((line, i) => (
                  <View key={i} {...getLineProps({ line, key: i })}>
                    <span>{i + 1}</span>
                    {line.map((token, key) => (
                      <Text
                        as="span"
                        key={key}
                        {...getTokenProps({ token, key })}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <CopyToClipboard text={codeString} onCopy={copy}>
              <Button
                size="small"
                variation="link"
                disabled={copied}
                position="absolute"
                right="xxxs"
                top="xxxs"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </CopyToClipboard>
          </View>
        </>
      )}
    </Highlight>
  );
};
