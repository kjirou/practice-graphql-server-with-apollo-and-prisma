# practice-graphql-server-with-apollo-and-prisma
## 💁 ゴール

- Node.js で GraphQL サーバを作る。
- データソースは何らかの RDB から提供する。

## ✋ 方針

- [これを読めばGraphQL全体がわかる。GraphQLサーバからDB、フロントエンド構築](https://reffect.co.jp/html/graphql) というまんまの記事があったので、とりあえずこの記事に従って作業する。
  - Apollo と Prisma (SQLite) を使っている。
  - 「Reactの場合」以降はわかるのと、 `npx create-react-app react-graphql` が正常終了しなかったので省略した。

## :world_map: 環境

- 依存しているソフトウェア
  - Node.js `16.11.1`
    - npm は付属のものを使う。
  - SQLite3
    - `sqlite3` へ PATH が通っていること。

## :gear: ローカル開発環境の構築

```
cp .env.default .env
npx prisma generate
npm start
```
