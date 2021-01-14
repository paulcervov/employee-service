import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import {tokenHandler} from "./handlers";
import jwt from "express-jwt";
import {decode} from "jsonwebtoken";
import {pick} from 'lodash'

createConnection().then(async () => {

    const app = express();

    app.use(express.json());

    app.use(jwt({
        secret: 'secret',
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: '/token', methods: ['POST']},
            {url: '/graphql', methods: ['GET']}
        ]
    }));

    // Error handling
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send(err);
        } else {
            next(err);
        }
    });

    app.post('/token', tokenHandler);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({req}) => {

            const token = req.headers.authorization.split(' ')[1];
            const payload = await decode(token);
            const user = pick(payload, ['id', 'role'])

            return {auth: {user}};
        }
    });

    server.applyMiddleware({app});

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )

}).catch(error => console.log(error));
