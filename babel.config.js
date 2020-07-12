module.exports = function(api) {
  if (api.env(['test'])) {
    return {
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
    };
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // for browserslist in package.json
          useBuiltIns: 'entry',
        }
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      '@babel/plugin-transform-runtime'
    ],
    ignore: [
      "**/*.test.js",
      "**/*.d.ts"
    ]
  };
};
