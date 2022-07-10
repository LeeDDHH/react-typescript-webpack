'use strict';

import path from 'path';
import { Configuration } from 'webpack';
import base from './webpack.common';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const front: Configuration = {
  ...base,
  entry: {
    front: './src/index.tsx',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default front;
