import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";

createConnection().then(async () => {

    const app = express();
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({app});

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )

}).catch(error => console.log(error));
