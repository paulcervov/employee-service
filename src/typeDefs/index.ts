import userTypeDefs from "./userTypeDefs";
import {gql} from 'apollo-server'

export default gql`

    type ValidationError {
        field: String,
        messages: [String!]!
    }

    interface Response {
        success: Boolean!
        message: String
    }

    ${userTypeDefs}
`;
