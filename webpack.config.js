const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
 
    mode: 'development',

    output:{
      clean: true,
      filename: 'main.[contenthash].js'
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

        ],
    },
    plugins: [
        new HtmlWebpack({
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtract({
          filename: '[name].[fullhash].css',
          ignoreOrder: false

        }),

        new CopyPlugin({
          patterns: [
            { from: 'src/assets/', to: 'assets/' }
          ]
        }),        

    ]
 
    
}
 