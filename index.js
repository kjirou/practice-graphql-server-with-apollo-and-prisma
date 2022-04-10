const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

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
