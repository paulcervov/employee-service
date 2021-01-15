import {rule} from 'graphql-shield'
import {Role} from '../enums/Role';

export const isHR = rule({cache: 'no_cache'})(
    async (parent, args, context) => {
        return context.user.role === Role.HR;
    },
);

export const isEmployee = rule({cache: 'no_cache'})(
    async (parent, args, context) => {
        return context.user.role === Role.Employee;
    },
);

export const isDirector = rule({cache: 'no_cache'})(
    async (parent, args, context) => {
        return context.user.role === Role.Director;
    },
);
