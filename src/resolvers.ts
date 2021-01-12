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


