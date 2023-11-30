module.exports = {
  // // Type check TypeScript files
  // '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js|css|mjs)': (filenames) => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ]
};
