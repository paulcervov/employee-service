import {User} from "../entity/User";
import {hash} from 'bcrypt';
import {validate} from 'class-validator';

export default {
    Query: {
        findUsers: (_, {first, offset}, {connection}) => {

            return connection.getRepository(User).find({
                take: first,
                skip: offset
            });
        },
        getUser: (_, {id}, {connection}) => {

            return connection.getRepository(User).findOne(id);
        },
    },
    Mutation: {
        createUser: async (_, {input}, {connection}) => {

            input = {
                ...input,
                password: await hash(input.password, 10)
            }

            const user = connection.getRepository(User).create(input);

            const errors = await validate(user, {validationError: {target: false, value: false}});

            if (errors.length > 0) {
                return {
                    success: false,
                    message: 'Данные неверны',
                    errors: errors.map(error => ({field: error.property, messages: Object.values(error.constraints)})),
                }
            }

            await connection.getRepository(User).save(user);

            return {
                success: true,
                message: 'Сотрудник был создан',
                user
            }
        },
        updateUser: async (_, {id, input}, {connection}) => {

            input = {
                ...input,
                password: await hash(input.password, 10)
            }

            const user = await connection.getRepository(User).findOne(id);

            if (user === undefined) {
                return {
                    success: false,
                    message: 'Сотрудник не был найден',
                }
            }

            const errors = await validate(user, {validationError: {target: false, value: false}});

            if (errors.length > 0) {
                return {
                    success: false,
                    message: 'Данные неверны',
                    errors: errors.map(error => ({field: error.property, messages: Object.values(error.constraints)})),
                }
            }

            await connection.getRepository(User).update(id, input);

            return {
                success: true,
                message: 'Сотрудник был обновлен',
                user
            }
        },
        deleteUser: async (_, {id}, {connection}) => {

            const user = await connection.getRepository(User).findOne(id);

            if (user === undefined) {
                return {
                    success: false,
                    message: 'Сотрудник не был найден',
                }
            }

            await connection.getRepository(User).delete(id);

            return {
                success: true,
                message: 'Сотрудник был удален',
                user
            }
        },
    },
    MutationResponse: {
        __resolveType() {
            return null;
        }
    }
}
