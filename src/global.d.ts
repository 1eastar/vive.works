declare module '*.scss' {
  const classes: { [className: string]: string }
  export = classes
}

declare module '*.svg' {
  const content: string
  export default content
}
