const { join } = require("path");
module.exports = {
  mode: "production",
  entry: "./index.jsx",
  output: {
    path: join(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      loader: "babel-loader",
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
}
