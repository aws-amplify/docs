// eslint-disable-next-line @typescript-eslint/no-var-requires
const prism = require('prismjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadLanguages = require('prismjs/components/');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Html5Entities = require('html-entities');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypeParse = require('rehype-parse');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const versions = require('../constants/versions.ts');

module.exports = (async () => {
  const { visit } = await import('unist-util-visit');
  const { unified } = await import('unified');

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
    'dart',
    'text',
    'plain',
    'sh'
  ];

  loadLanguages(supportedLanguages);

  const highlight = (code, language) => {
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

    const lineCount = html.split(/\r\n|\r|\n/).length;

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
        value: `<CodeBlock language="${language}" lineCount="${lineCount}">`
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

  const codeBlockPlugin = () => (tree) => {
    visit(tree, (node) => {
      if (node.tagName === 'code') {
        const code = addVersions(node.children[0].value);
        const language =
          'className' in node.properties
            ? node.properties.className[0]
            : 'markup';
        node.children = highlight(code, language);
      }
    });
  };

  return codeBlockPlugin;
})();
