'use strict';

import { Configuration } from 'webpack';

import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const front: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        // ファイルそのまま取り込む
        // type: 'asset/resource',
        // Base64にして取り込む
        type: 'asset/inline',
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: true, // This is useful for cache busting
      filename: 'index.html',
    }),
  ],
};

export default front;
