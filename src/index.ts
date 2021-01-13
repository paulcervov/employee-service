import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import {User} from "./entity/User";
import {compare} from 'bcrypt';
import {sign} from "jsonwebtoken";

createConnection().then(async (connection) => {

    const app = express();
    app.use(express.json());

    app.post('/token', async ({body}, res) => {

        let bodyIsValid: boolean,
            user: User | undefined = undefined,
            passwordIsValid: boolean = false;

        bodyIsValid = ['phone', 'password'].every((v) => {
            return (v in body) && (v !== undefined) && (v !== '');
        });

        if (bodyIsValid) {
            user = await connection.getRepository(User).findOne({
                select: ["id", "phone", "password"],
                where: {
                    phone: body.phone
                }
            });
        }

        if (user === undefined) {
            res.status(422).json({message: 'Username or password is incorrect'});
            return;
        }

        passwordIsValid = await compare(body.password, user.password)

        if (!passwordIsValid) {
            res.status(422).json({message: 'Username or password is incorrect'});
            return;
        }

        res.status(200).json({
            token: sign({
                id: user.id,
                phone: user.phone
            }, 'secret', {
                expiresIn: 60 * 10
            }),
        });
    });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({app});

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )

}).catch(error => console.log(error));
