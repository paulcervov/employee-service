import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {tokenHandler} from "./handlers";
import {decode} from "jsonwebtoken";
import {pick} from 'lodash'
import schema from './schema'

import {errorHandlingMiddleware, jwtValidationMiddleware} from './middlewares'


async function bootstrap() {

    const connection = await createConnection();
    const app = express();

    app.use(express.json());
    app.use(jwtValidationMiddleware);
    app.use(errorHandlingMiddleware);
    app.post('/token', tokenHandler);

    const server = new ApolloServer({
        schema,
        context: async ({req}) => {

            const token = req.headers.authorization.split(' ')[1];
            const payload = await decode(token);
            const user = pick(payload, ['id', 'role'])

            return {
                user,
                connection,
            };
        }
    });

    server.applyMiddleware({app});

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )

}

bootstrap();
