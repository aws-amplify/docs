import {
  CodeBlockStyle,
  CodeHighlightStyle,
  CopyButtonStyle,
  LineCountStyle
} from './styles';
import React from 'react';
import copy from 'copy-to-clipboard';
import rangeParser from 'parse-numeric-range';

import Highlight, { defaultProps } from 'prism-react-renderer';

import styled from '@emotion/styled';

export const Line = styled.div`
  display: table-row;
`;

export const LineNumber = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;

const COPY = 'copy';
const COPIED = 'copied';
const FAILED = 'failed to copy';
const CONSOLE = 'console';

type CopyMessageType = typeof COPY | typeof COPIED | typeof FAILED;

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

export default function CodeBlock({ children, language }) {
  console.log(children);
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({ line, key: index });
            console.log(lineProps);
            return (
              <Line key={index} {...getLineProps({ line, key: index })}>
                <LineNumber>{index + 1}</LineNumber>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}

// type CodeBlockProps = {
//   lineCount: string;
//   language: string;
//   children: React.ReactElement[];
// };

// type CodeBlockState = {
//   copyMessage: CopyMessageType;
// };

// class CodeBlock extends React.Component<CodeBlockProps, CodeBlockState> {
//   element?: HTMLDivElement;

//   constructor(props) {
//     super(props);
//     this.state = {copyMessage: COPY};
//   }

//   lineNumbers = () => {
//     const lineCount = parseInt(this.props.lineCount);
//     if (lineCount > 1 && this.props.language !== CONSOLE) {
//       return (
//         <LineCountStyle>
//           <div>
//             {new Array(lineCount).fill(null).map((_, i) => (
//               <span key={String(i + 1)}>{String(i + 1)}</span>
//             ))}
//           </div>
//         </LineCountStyle>
//       );
//     }
//   };

//   setElement = (ref: HTMLDivElement | undefined) => {
//     if (ref !== null) {
//       this.element = ref;
//     }
//   };

//   copyToClipboard = () => {
//     if (this.element && this.element.textContent) {
//       copy(this.element.textContent);
//       this.setState({copyMessage: COPIED});
//     } else {
//       this.setState({copyMessage: FAILED});
//     }
//     setTimeout(() => {
//       this.setState({copyMessage: COPY});
//     }, 1500);
//   };

//   copyButton = () => {
//     if (this.props.language !== CONSOLE) {
//       return (
//         <CopyButtonStyle onClick={this.copyToClipboard}>
//           <span>{this.state.copyMessage}</span>
//         </CopyButtonStyle>
//       );
//     }
//   };

//   render() {
//     if (this.props.children === undefined) return <div></div>;
//     const oneLine =
//       this.props.lineCount === "1" || this.props.language === CONSOLE;

//     return (
//       <CodeBlockStyle oneLine={oneLine}>
//         {this.lineNumbers()}
//         <CodeHighlightStyle ref={this.setElement}>
//           {this.props.children}
//         </CodeHighlightStyle>
//         {this.copyButton()}
//       </CodeBlockStyle>
//     );
//   }
// }

// export default CodeBlock;
