import {User} from "../entity/User";
import {getRepository} from "typeorm";
import {hash} from 'bcrypt';
import {validate} from 'class-validator';

export default {
    Query: {
        findUsers: (_, {first, offset}) => {

            return getRepository(User).find({
                take: first,
                skip: offset
            });
        },
        getUser: (_, {id}) => {

            return getRepository(User).findOne(id);
        },
    },
    Mutation: {
        createUser: async (_, {input}) => {

            input = {
                ...input,
                password: await hash(input.password, 10)
            }

            const user = getRepository(User).create(input);

            const errors = await validate(user, {validationError: {target: false, value: false}});

            if (errors.length > 0) {
                return {
                    success: false,
                    message: 'Данные неверны',
                    errors: errors.map(error => ({field: error.property, messages: Object.values(error.constraints)})),
                }
            }

            await getRepository(User).save(user);

            return {
                success: true,
                message: 'Сотрудник был создан',
                user
            }
        },
        updateUser: async (_, {id, input}) => {

            input = {
                ...input,
                password: await hash(input.password, 10)
            }

            const user = await getRepository(User).findOne(id);

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

            await getRepository(User).update(id, input);

            return {
                success: true,
                message: 'Сотрудник был обновлен',
                user
            }
        },
        deleteUser: async (_, {id}) => {

            const user = await getRepository(User).findOne(id);

            if (user === undefined) {
                return {
                    success: false,
                    message: 'Сотрудник не был найден',
                }
            }

            await getRepository(User).delete(id);

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
