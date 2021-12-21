const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
 
    mode: 'production',

    output:{
      clean: true,
      filename: 'main.js'
      // filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
              test: /\.html$/i,
              loader: 'html-loader',
              options: {
                          sources: false,
                          minimize: false,
                        },
            },

            {
              test: /\.css$/,
              exclude: /styles.css$/,
              use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader'
                  }
              ]
            },

            {
              test: /styles.css$/,
              use: [ MiniCssExtract.loader, 'css-loader']

            },

            {
              test: /\.(png|jpe?g|gif)$/,
              loader: 'file-loader'
            },            

            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }

        ],
    },


    optimization:{

      minimize: true,
      minimizer: [
        new CssMinimizer(),
        new Terser(),
      ]

    },

    plugins: [
        new HtmlWebpack({
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtract({
          filename: '[name].css',
          // filename: '[name].[fullhash].css',
          ignoreOrder: false

        }),

        new CopyPlugin({
          patterns: [
            { from: 'src/assets/', to: 'assets/' }
          ]
        }),        

    ]
 
    
}
 