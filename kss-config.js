const config = {
  title: "Abel and Cole Styles",
  source: "./src/scss/",
  destination: "./dist/styleguide/",
  builder: "node_modules/michelangelo/kss_styleguide/custom-template/",
  css: [
    "../AC.css"
  ]
}

module.exports.config = config;