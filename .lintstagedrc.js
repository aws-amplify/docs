module.exports = {
  '**/*.(ts|tsx|js|css|mjs)': (filenames) => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ]
};
