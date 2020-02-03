import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date
  type Listing {
    id: ID!
    title: String!
    description: String!
  }
  type User {
    email: String!
    id: ID!
  }

  type UserSession {
    createdAt: Date!
    expirseAt: Date!
    id: ID!
    user: User!
  }
  type Mutation {
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    createListing(title: String!, description: String!): Listing!
    deleteUserSession(sessionId: ID!): Boolean!
  }
  type Query {
    listings: [Listing!]!
    userSession(me: Boolean!): UserSession
  }
`;
export default typeDefs;
