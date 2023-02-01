module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      'babel-preset-gatsby',
      {
        reactRuntime: 'automatic',
        modules: false,
        loose: true,
      },
      'es2021',
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true, // defaults to false
        allExtensions: true, // defaults to false
      },
    ],
  ]

  const plugins = []

  return { presets, plugins }
}