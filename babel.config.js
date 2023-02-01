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
  ]

  const plugins = []

  return { presets, plugins }
}