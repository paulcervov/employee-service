import userTypeDefs from "./userTypeDefs";
import {gql} from 'apollo-server'

export default gql`
    ${userTypeDefs}
`;
