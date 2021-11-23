const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    trainers: "./src/trainers.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
