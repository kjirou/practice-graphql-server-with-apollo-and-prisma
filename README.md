# practice-graphql-server-with-apollo-and-prisma
## 💁 ゴール

- Node.js で GraphQL サーバを作る。
- データソースは何らかの RDB から提供する。

## ✋ 方針

- [これを読めばGraphQL全体がわかる。GraphQLサーバからDB、フロントエンド構築](https://reffect.co.jp/html/graphql) というまんまの記事があったので、とりあえずこの記事に従って作業する。
  - Apollo と Prisma (SQLite) を使っている。

## :world_map: 環境

- Node.js `16.11.1`。npm は付属のもの。

## :gear: ローカル開発環境の構築

- 依存しているソフトウェア
  - SQLite

```
cp .env.default .env
npm start
```