/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  testEnvironment: "node",
  transform: {
    "^.+\\.(tsx|ts|js|jsx)?$": ["esbuild-jest", { sourcemap: true }],
  },
  // moduleNameMapper: {
  //   "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  //   "\\.(gif|ttf|eot|svg|wav)$": "<rootDir>/__mocks__/fileMock.js",
  // },
};
