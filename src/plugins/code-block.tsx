// eslint-disable-next-line @typescript-eslint/no-var-requires
const prism = require('prismjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadLanguages = require('prismjs/components/');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Html5Entities = require('html-entities');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const unified = require('unified');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypeParse = require('rehype-parse');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const versions = require('../constants/versions.ts');

const entities = new Html5Entities.Html5Entities();

const supportedLanguages = [
  'markup',
  'objectivec',
  'html',
  'xml',
  'css',
  'docker',
  'go',
  'ini',
  'js',
  'ts',
  'bash',
  'swift',
  'kotlin',
  'python',
  'java',
  'yaml',
  'ruby',
  'wasm',
  'rust',
  'json',
  'typescript',
  'javascript',
  'graphql',
  'diff',
  'jsx',
  'sql',
  'groovy',
  'dart'
];

loadLanguages(supportedLanguages);

let lineCountOffSet = 0;

const highlight = (code, language, regions, idx) => {
  language = language.replace('language-', '');
  let highlighted = '';
  const languageIsSet = !!(language && language.trim().length > 0);
  code = code.trim();

  if (languageIsSet && prism.languages[language]) {
    if (!supportedLanguages.includes(language)) {
      throw new Error(
        `No support for ${language} syntax highlighting. Contact Amplify JS team to request support.`
      );
    }

    highlighted = prism.highlight(code, prism.languages[language], language);
  } else {
    highlighted = entities.encode(code);
  }

  const html = `<div slot="content" class="highlight highlight-source${
    languageIsSet ? `-${language}` : ''
  }">${highlighted}</div>`;

  let lineCount = html.split(/\r\n|\r|\n/).length;

  if (regions > 1 && idx > 0) {
    lineCountOffSet = lineCountOffSet + lineCount;
  } else {
    lineCountOffSet = 0;
  }

  // const noCopy = code.indexOf('###BEGIN_COPY###') > -1;

  return [
    {
      type: 'element',
      tagName: 'p',
      properties: {
        class: 'searchable-code'
      },
      children: [
        {
          type: 'text',
          value: `${entities.encode(code)}`
        }
      ]
    },
    {
      type: 'jsx',
      value: `<CodeBlock language="${language}" lineCount="${lineCount}" lineCountOffset="${lineCountOffSet}" noCopy="${false}" >`
    },
    ...unified()
      .use(rehypeParse, { fragment: true })
      .parse(html).children,
    {
      type: 'jsx',
      value: `</CodeBlock>`
    }
  ];
};

const addVersions = (code) => {
  code = code.replace(/ANDROID_VERSION/g, versions.ANDROID_VERSION);
  code = code.replace(
    /ANDROID_KOTLIN_VERSION/g,
    versions.ANDROID_KOTLIN_VERSION
  );
  code = code.replace(/ANDROID_GEO_VERSION/g, versions.ANDROID_GEO_VERSION);

  return code;
};

const removeCopy = (code) => {
  code = code.split('###BEGIN_COPY###');
  return code;
};

const reducer = (previousValue, currentValue) =>
  previousValue.concat(currentValue);

const codeBlockPlugin = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const visit = require('unist-util-visit');

  visit(tree, (node) => {
    if (node.tagName === 'code') {
      let code = addVersions(node.children[0].value);
      code = removeCopy(code);

      const language =
        'className' in node.properties
          ? node.properties.className[0]
          : 'markup';
      node.children = code
        .map((section, idx) => highlight(section, language, code.length, idx))
        .reduce(reducer);

      console.log(node.children);
    }
  });
};

module.exports = codeBlockPlugin;
