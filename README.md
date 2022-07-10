# React + TypeScript + Webpack5

## プロジェクト前提

- できるだけ `ts` ファイルで構成する
- `dev` は `webpack` の `devServer` で立ち上げる
- `create-react-app` ではなく、 `webpack` でビルドする
- `public` 配下に `mock service worker` を立ち上げるためのコードを配置
  - `webpack-dev-server` が `webpack` 以外で提供されるリソースを `public` から取得する
  - `npx msw init public/ --save` でコードを配置できる

- `webpack` のビルド速度改善
  - 以下のパッケージを導入
  - `esbuild-loader`
    - `esbuild` が提供している API を利用して作成された loader
    - `ts-loader` より早い
    - [privatenumber/esbuild-loader: ⚡️ Speed up your Webpack build with esbuild](https://github.com/privatenumber/esbuild-loader)
  - `fork-ts-checker-webpack-plugin`
    - `ts-loader` の型チェックの部分のみを切り出したプラグイン
    - `esbuild`, `esbuild-loader` の弱点である、**型チェックが行えないという問題**が解決できる
    - [TypeStrong/fork-ts-checker-webpack-plugin: Webpack plugin that runs typescript type checker on a separate process.](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)
  - `thread-loader`
    - 各々のファイル拡張子に対応する loader ごとにスレッドを分割し、マルチスレッドで処理を行うことできる
    - [thread-loader | webpack](https://webpack.js.org/loaders/thread-loader/)
  - 参考記事
    - [webpack と esbuild-loader で爆速な React 開発環境を構築しよう - Qiita](https://qiita.com/olt/items/3f1f1ca03cfb4492e623)

---

## 構成

|                                |        |
| :----------------------------: | :----: |
|            Node.js             | 18.0.0 |
|              npm               | 8.6.0  |
|             React              | 18.2.0 |
|           TypeScript           | 4.7.4  |
|            webpack             | 5.73.0 |
|          webpack-cli           | 4.10.0 |
|       webpack-dev-server       | 4.9.3  |
|              msw               | 0.42.3 |
|         esbuild-loader         | 2.19.0 |
| fork-ts-checker-webpack-plugin | 7.2.11 |
|         thread-loader          | 3.0.4  |

---

## コマンド

### プロジェクト初期化

```bash
npm install
npx msw init public/ --save
```

### ローカルで dev 実行

```bash
npm run dev
```

- `dist` を削除する
- `dev` 用にビルドする
- `webpack` の `devServer` で立ち上げる

### ローカルで prod 実行

```bash
npm start
```

- `dist` を削除する
- `prod` 用にビルドする
- `http-server` でローカルの HTTP サーバーをで立ち上げる

### prod 用のビルドをする

```bash
npm run build
```

- `dist` を削除する
- `prod` 用にビルドする
