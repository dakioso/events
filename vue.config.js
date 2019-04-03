// module.exports = {
//   runtimeCompiler: true,
//
//   pluginOptions: {
//     'style-resources-loader': {
//       preProcessor: 'scss',
//       patterns: []
//     }
//   }
// }

const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};
