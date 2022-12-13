declare module '*.scss' {
  const classes: { readonly [className: string]: string }
  export = classes
}
