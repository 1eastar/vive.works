// Original: https://github.com/sdras/night-owl-vscode-theme
// Converted automatically using ./tools/themeFromVsCode

import type { PrismTheme } from "prism-react-renderer"

const theme: PrismTheme = {
  plain: {
    color: "#403f53",
    backgroundColor: "#F7F7F7"
  },
  styles: [{
    types: ["changed"],
    style: {
      color: "rgb(162, 191, 252)",
    }
  }, {
    types: ["deleted"],
    style: {
      color: "rgba(239, 83, 80, 0.56)",
    }
  }, {
    types: ["inserted", "attr-name", "attr-value", "spread"],
    style: {
      color: "#63A35C",
    }
  }, {
    types: ["comment"],
    style: {
      color: "rgb(152, 159, 177)",
    }
  }, {
    types: ["string", "builtin", "char", "constant", "url", "number", "boolean"],
    style: {
      color: "#50A14F"
    }
  }, {
    types: ["variable"],
    style: {
      color: "rgb(201, 103, 101)"
    }
  }, {
    types: ["punctuation"],
    style: {
      color: "#212529"
    }
  }, {
    types: ["operator"],
    style: {
      color: "#0184BC"
    }
  }, {
    types: ["function", "selector", "doctype"],
    style: {
      color: "#005CC5",
    }
  }, {
    types: ["property", "keyword", "namespace", "class-name", "tag"],
    style: {
      color: "#A626A4"
    }
  }]
}

export default theme
