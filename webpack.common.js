const { resolve } = require("path")

module.exports = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.ts"
  },
  output: {
    path: resolve(__dirname, "build", "unpacked")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js']
  }
}