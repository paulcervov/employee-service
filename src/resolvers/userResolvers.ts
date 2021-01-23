import {User} from "../entity/User";
import {hash} from 'bcrypt';
import {validate} from 'class-validator';
import {Role} from '../enums/Role';

export default {
    Query: {
        findUsers: async (_, {first, offset}, {connection}) => {

            return {
                success: true,
                users: connection.getRepository(User).find({
                    take: first,
                    skip: offset
                })
            };
        },
        getUser: async (_, {id}, {connection}) => {

            return {
                success: true,
                user: await connection.getRepository(User).findOne(id)
            };
        },
    },
    Mutation: {
        createUser: async (_, {input}, {connection, auth}) => {

            if (auth.user.role === Role.Employee) {
                return {
                    success: false,
                    message: 'Нет прав',
                }
            }

            input = {
                ...input,
                password: await hash(input.password, 10)
            }

            const user = connection.getRepository(User).create(input);

            const validationErrors = await validate(user, {validationError: {target: false, value: false}});

            if (validationErrors.length > 0) {
                return {
                    success: false,
                    message: 'Данные неверны',
                    validationErrors: validationErrors.map(error => ({
                        field: error.property,
                        messages: Object.values(error.constraints)
                    })),
                }
            }

            await connection.getRepository(User).save(user);

            return {
                success: true,
                message: 'Сотрудник был создан',
                user
            }
        },
        updateUser: async (_, {id, input}, {connection, auth}) => {

            if (auth.user.role === Role.Employee) {
                return {
                    success: false,
                    message: 'Нет прав',
                }
            }

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

            const validationErrors = await validate(user, {validationError: {target: false, value: false}});

            if (validationErrors.length > 0) {
                return {
                    success: false,
                    message: 'Данные неверны',
                    validationErrors: validationErrors.map(error => ({
                        field: error.property,
                        messages: Object.values(error.constraints)
                    })),
                }
            }

            await connection.getRepository(User).update(id, input);

            return {
                success: true,
                message: 'Сотрудник был обновлен',
                user
            }
        },
        deleteUser: async (_, {id}, {connection, auth}) => {

            if (auth.user.role !== Role.Director) {
                return {
                    success: false,
                    message: 'Нет прав',
                }
            }

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
}
