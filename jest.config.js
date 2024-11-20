const nextJest = require('next/jest.js');
// mock "fetch" in test environment
require('cross-fetch/polyfill');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    // map swiper css to styleMock.js
    'swiper/css': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
};

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(config);

module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: [
    // swiper and url-join need to be transformed
    'node_modules/(?!(swiper|url-join)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
});
