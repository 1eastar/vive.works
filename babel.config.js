module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      'babel-preset-gatsby',
      // babel-preset-gatsby 안의 @babel/preset-env 프리셋이 commonjs로 변환되면 tree shaking이 일어나지 않음
      // @babel/preset-env modules: false로 설정해주면 항상 ES 모듈로 변환되게끔 할 수 있다.
      // default "modules: auto"
      {
        reactRuntime: 'automatic'
      },
    ],
    `@babel/preset-typescript`,
  ]

  const plugins = []

  return { presets, plugins }
}