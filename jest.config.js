module.exports = {
  // TypeScript files will be handled by ts-jest, and JavaScript files will be handled by babel-jest.
  preset: 'ts-jest/presets/js-with-babel',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  // ignore these build, dist & library directories
  coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/redux-modules/build'
  ],
  setupFilesAfterEnv: ['./jest.setup.js']
};
