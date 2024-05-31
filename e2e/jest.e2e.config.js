module.exports = {
  rootDir: './',
  preset: 'jest-puppeteer',
  testMatch: ['<rootDir>/*.test.js'],
  transformIgnorePatterns: ['node_modules/(?!variables/.*)']
};
