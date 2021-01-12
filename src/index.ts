import "reflect-metadata";
import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server";
import {typeDefs} from "./schema";
import * as resolvers from "./resolvers";

createConnection().then(async connection => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });

}).catch(error => console.log(error));
