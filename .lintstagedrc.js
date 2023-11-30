module.exports = {
  // // Type check TypeScript files
  // '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js|css|mdx)': (filenames) => [
    `yarn eslint ${filenames.join(' ')}`
    // `yarn prettier --write ${filenames.join(' ')}`
  ]

  // Prettify only Markdown and JSON files
  // '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`
};
