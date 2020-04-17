const { gql } = require('apollo-server');


const typeDefs = gql`
  type Query {
    hello: String!
    currentUser: User!
  }

  type User {
    id: ID!
    username: String!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    author: User
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
    addProject(name: String!, description: String!): Project!
  }

`;

module.exports = typeDefs;
