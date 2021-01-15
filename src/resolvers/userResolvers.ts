import {User} from "../entity/User";
import {getRepository} from "typeorm";
import {hash} from 'bcrypt';

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

            await getRepository(User).update(id, input);

            return {
                success: true,
                message: 'Сотрудник был обновлен',
                user
            }
        },
        deleteUser: async (_, {id}) => {

            const user = await getRepository(User).findOne(id);

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
