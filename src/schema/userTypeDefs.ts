import {gql} from 'apollo-server'

export default gql`

    type Query {
        "Geting list of users"
        findUsers(first: Int = 10, offset: Int = 0): [User]!
        "Geting one user by id"
        getUser(id: ID!): User
    }

    type User {
        id: ID!
        lastName: String!
        firstName: String!
        middleName: String!
        dateOfBirth: String!
        phone: String!
        address: String!
        position: String!
        role: Int!
    }

    type Mutation {
        # Storing new user
        createUser(input: UserInput!): UserMutationResponse

        # Update an existing user by id
        updateUser(id: ID!, input: UserInput!): UserMutationResponse

        # Delete an existing user by id
        deleteUser(id: ID!): UserMutationResponse

        # Restore an existing user by id
        restoreUser(id: ID!): UserMutationResponse
    }

    input UserInput {
        firstName: String!
        middleName: String!
        lastName: String!
        phone: String!
        password: String!
        dateOfBirth: String!
        address: String!
        position: String!
        role: Int!
    }

    interface MutationResponse {
        success: Boolean!
        message: String!
    }

    type UserMutationResponse implements MutationResponse {
        success: Boolean!
        message: String!
        errors: [ValidationError!]
        user: User
    }
`;
