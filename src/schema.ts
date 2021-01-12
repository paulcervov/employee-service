import {gql} from 'apollo-server'

export const typeDefs = gql`
    
    type Query {
        "Geting list of users"
        findUsers(first: Int = 5, offset: Int): [User]!
        "Geting one user by id"
        getUser(id: ID!): User
    }

    type User {
        id: ID!
        lastName: String!
        firstName: String!
        middleName: String!
        dateOfBirth: String!
        address: String!
        position: String!
        role: Int!
    }
`;
