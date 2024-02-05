const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")

module.exports = {
  entry: "./src/index.js",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js", publicPath: '/'},
  mode: process.env.NODE_ENV || "development",
  resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
  // devServer: { contentBase: path.join(__dirname, "src") },
  devServer: {
    historyApiFallback: true,

    static: {
      directory: path.join(__dirname, "src")
  }},
  module: {
    rules: [
      {
        exclude: "/node_modules/",
        loader: "babel-loader",
        test: /\.jsx?$/,
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': '/scrumboard-frontent/',
    }),
    
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
      inject: "body",
      baseURL: '/scrumboard-frontent/'
    }),
  ],
};
