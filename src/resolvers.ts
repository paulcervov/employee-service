import {User} from "./entity/User";
import {getRepository} from "typeorm";

export const Query = {
    findUsers: (_, {first, offset}, context, info) => {

        return getRepository(User).find({
            take: 10
        });
    },
    getUser: (_, {id}, context, info) => {
        return getRepository(User).findOne(id);
    },
}

export const Mutation = {
    createUser: async (_, {input}) => {

        const user = getRepository(User).create(input);

        await getRepository(User).save(user);

        return {
            success: true,
            message: 'Сотрудник был создан',
            user
        }
    },
    updateUser: async (_, {id, input}) => {

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
}

export const MutationResponse = {
    __resolveType() {
        return null;
    }
}
