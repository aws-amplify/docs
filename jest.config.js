module.exports = {
  preset: './preset.js',
  rootDir: './',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx|js|mjs)$': [
      'babel-jest',
      {
        presets: ['next/babel']
      }
    ]
  },
  testPathIgnorePatterns: ['capi', '.next', 'client'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/constants/(.*)': '<rootDir>/src/constants/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '@/data/(.*)': '<rootDir>/src/data/$1',
    '@/directory/(.*)': '<rootDir>/src/directory/$1'
  },
  transformIgnorePatterns: []
};
