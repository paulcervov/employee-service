import {User} from "../entity/User";
import {getRepository} from "typeorm";
import {compare} from 'bcrypt';
import {sign} from "jsonwebtoken";

export const tokenHandler = async ({body}, res) => {

    let bodyIsValid: boolean,
        user: User | undefined = undefined,
        passwordIsValid: boolean = false;

    bodyIsValid = ['phone', 'password'].every((v) => {
        return (v in body) && (v !== undefined) && (v !== '');
    });

    if (bodyIsValid) {
        user = await getRepository(User).findOne({
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

    passwordIsValid = await compare(body.password, user.password);

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
}



