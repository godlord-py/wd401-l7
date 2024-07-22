const path = require('path');

module.exports = {
  setupFiles: ["<rootDir>/_tests_/mocks/jest.setup.ts"],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)', '**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFilesAfterEnv: ['./_tests_/setupTests.ts', './_tests_/mocks/jest.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!some-es6-module-to-transform)'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.js',
    '^src/config/constants$': path.resolve(__dirname, '_tests_/mocks/constantsMock.ts')
  },
};