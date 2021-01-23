import jwt from "express-jwt";
import {config} from 'dotenv';

config();

export const jwtValidationMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}).unless({
    path: [
        {url: '/token', methods: ['POST']},
        {url: '/graphql', methods: ['GET']}
    ]
});


export const errorHandlingMiddleware = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err);
    } else {
        next(err);
    }
};
