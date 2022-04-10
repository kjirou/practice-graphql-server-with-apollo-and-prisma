const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    myPosts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
  }

  type Query {
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
    posts: [Post]
  }
`

const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
    users: async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    },
    user: async (parent, args) => {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${args.id}`
      );
      return response.data;
    },
    posts: async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return response.data;
    },
  },
  User: {
    myPosts: async (parent) => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const myPosts = response.data.filter((post) => post.userId == parent.id);
      return myPosts;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
