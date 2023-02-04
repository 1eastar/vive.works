const babelOptions = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        reactRuntime: 'automatic',
        modules: false,
        loose: true,
      },
      'es2021',
    ],
    '@babel/preset-typescript'
  ],
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').default.createTransformer(babelOptions)