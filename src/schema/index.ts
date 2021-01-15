import userTypeDefs from "./userTypeDefs";
import {gql} from 'apollo-server'
import {applyMiddleware} from 'graphql-middleware'
import {makeExecutableSchema} from 'graphql-tools'
import resolvers from "../resolvers";
import permissions from "../permissions";

const typeDefs = gql`
    ${userTypeDefs}
`;

export default applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    permissions
);
