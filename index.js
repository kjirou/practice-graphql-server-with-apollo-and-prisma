const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class jsonPlaceAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getUsers() {
    const data = await this.get('/users');
    return data;
  }
  async getUser(id) {
    const data = await this.get(`/users/${id}`);
    return data;
  }
  async getPosts() {
    const data = await this.get('/posts');
    return data;
  }
}

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

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String!): User
  }
`

const resolvers = {
  Query: {
    hello: (_, args) => `Hello ${args.name}`,
    users: async (_, __, { dataSources }) => {
      return prisma.user.findMany();
    },
    user: async (_, args, { dataSources }) => {
      return dataSources.jsonPlaceAPI.getUser(args.id);
    },
    posts: async (_, __, { dataSources }) => {
      return dataSources.jsonPlaceAPI.getPosts();
    },
  },
  User: {
    myPosts: async (parent, __, { dataSources }) => {
      const posts = await dataSources.jsonPlaceAPI.getPosts();
      const myPosts = posts.filter((post) => post.userId == parent.id);
      return myPosts;
    },
  },
  Mutation: {
    createUser: (_, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
    updateUser:(_, args) => {
      return prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      jsonPlaceAPI: new jsonPlaceAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
