'use strict';

import path from 'path';
import { Configuration } from 'webpack';

import 'webpack-dev-server';

import base from './webpack.common';

const front: Configuration = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    port: 4000,
  },
};

export default front;
