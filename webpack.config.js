const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const { visualize = false, prod = false } = env;

  return {
    mode: prod ? "production" : "development",
    context: path.join(__dirname, "./"),
    entry: {
      app: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    devtool: "source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 9000,
      open: true
    },
    plugins: [
      new CleanWebpackPlugin(["build/*"], { verbose: true }),
      new CompressionPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "./src/index.html"
      }),
      visualize && new BundleAnalyzerPlugin()
    ].filter(plugin => plugin),
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ uglifyOptions: { output: { comments: false } } })
      ]
    }
  };
};
