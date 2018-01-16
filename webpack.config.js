const path = require('path');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');


/*
  Define environment specific values for
  development | testing | production
*/
var buildDir;
var entry;
switch (process.env.NODE_ENV) {
  case "production":
    title = "Skicker LoggerManager Demo";
    buildDir = "./dist";
    entry = {
      app:     './src/app.js',
    };
    sourceMap = false;
    break;

  case "development":
    title = "Skicker LoggerManager Demo Development";
    buildDir = "./dev";
    entry = {
      app:     './src/app.js',
    };
    sourceMap = true;
    break;

  case "testing":
    title = "Skicker LoggerManager Demo Testing";
    buildDir = "./dev-test";
    entry = {
      tests:   './test/specRoot.js',
    };
    sourceMap = true;
    break;

  default:
    throw new Error("Environment variable NODE_ENV '"+process.env.NODE_ENV+"' is not oneOf ['production', 'development', 'testing']");
}


/*
  Define a shared configuration for all environments
*/
var webpackCommonConfig = {
  entry: entry,
  output: {
    filename:   '[name].bundle.js',
    path:       path.resolve(__dirname, buildDir),
  },
  devServer: {
    contentBase: buildDir,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: sourceMap,
              sourceMap: sourceMap
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: sourceMap,
              singleton: true,
            }
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new HtmlWebpackPlugin({
      title:    title,
      filename: "index.html",
      template: "./src/index.html.lodash",
      inject: true,
      hash: true,
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
};



/*
  Merge environment specific configurations over the common config

*/

var webpackConfig;
switch (process.env.NODE_ENV) {
  case "production":

    webpackConfig = merge(webpackCommonConfig, {
      output: {
        publicPath: process.env.WEBPACK_PUBLIC_PATH,
      },
    });

    break;


  case "development":

    webpackConfig = merge(webpackCommonConfig, {
      devtool: 'inline-source-map',
    });

    break;


  case "testing":

    webpackConfig = merge(webpackCommonConfig, {
      devtool: 'inline-source-map',
      plugins: [
        new CopyWebpackPlugin([
          { from: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.css',     to: 'jasmine/' },
          { from: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',      to: 'jasmine/' },
          { from: 'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js', to: 'jasmine/' },
          { from: 'node_modules/jasmine-core/lib/jasmine-core/json2.js',        to: 'jasmine/' },
          { from: 'node_modules/jasmine-core/lib/jasmine-core/boot.js',         to: 'jasmine/' },
        ]),
      ],
    });

    break;


  default:
    throw new Error("Environment variable NODE_ENV '"+process.env.NODE_ENV+"' is not oneOf ['production', 'development', 'testing']");
}


module.exports = webpackConfig;