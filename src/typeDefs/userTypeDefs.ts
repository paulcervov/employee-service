import {gql} from 'apollo-server'

export default gql`

    type Query {
        "Geting list of users"
        findUsers(first: Int = 10, offset: Int = 0): findUsersQueryResponse!
        "Geting one user by id"
        getUser(id: ID!): GetUserQueryResponse!
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

    type findUsersQueryResponse implements Response {
        success: Boolean!
        message: String
        users: [User]!
    }

    type GetUserQueryResponse implements Response {
        success: Boolean!
        message: String
        user: User
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

    type UserMutationResponse implements Response {
        success: Boolean!
        message: String!
        validationErrors: [ValidationError!]
        user: User
    }
`;
