const webpack = require("webpack");
const path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports.webpack = {
  options: {

    entry: ["./assets/js"],
    output: {
      path: ".tmp/public/js",
      publicPath: "/",
      filename: "bundle.js"
    },

    devtool: "source-map",

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }),
      new ExtractTextPlugin("style.css")
    ],
    module: {
      loaders: [
        // requires "npm install --save-dev babel-loader"
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.json$/,
          exclude: /node_modules/,
          loader: "json-loader"
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style", "css")
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style", "css!less-loader")
        },
        {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
        {test: /\.ttf$/, loader: "file-loader"},
        {test: /\.eot$/, loader: "file-loader"},
        {test: /\.svg$/, loader: "file-loader"},
        {test: /\.jpg$/, loader: "file-loader"},
        {test: /\.html$/, loader: "html-loader"}
      ],
      noParse: /angular\/angular.js/
    }
  },

  // docs: https://webpack.github.io/docs/node.js-api.html#compiler
  watchOptions: {
    aggregateTimeout: 300
  }
};
