'use strict';

import path from 'path';

import { Configuration } from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const base: Configuration = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 80,
              workerNodeArgs: ['--max-old-space-size=512'],
              name: 'ts-loader-pool',
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              minify: isDev,
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 80,
              workerNodeArgs: ['--max-old-space-size=512'],
              name: 'tsx-loader-pool',
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              // loaderはstring型なのでtsとtsxファイルの設定を別々に定義する必要がある
              loader: 'tsx',
              minify: isDev,
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              // worker thread数
              workers: 2,
              // 並列処理の上限数
              workerParallelJobs: 40,
              // キャッシュのmaxサイズ
              workerNodeArgs: ['--max-old-space-size=512'],
              // thread pool名（固有）
              name: 'css-loader-pool',
            },
          },
          { loader: MiniCssExtractPlugin.loader },
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
};

export default base;
