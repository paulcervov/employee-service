import * as faker from 'faker/locale/ru';
import {createConnection, getRepository} from "typeorm";
import {User} from "./entity/User";
import {Role} from './enums/Role';

createConnection().then(async connection => {

    const userRepository = getRepository(User);
    const users: User[] = [];
    const roles = Object.values(Role).filter(v => typeof v === 'number');

    for (let i = 1; i < 30; i++) {

        const gender: number[] = faker.random.arrayElement([1, 2]);

        const user: User = userRepository.create({
            lastName: faker.name.lastName(gender),
            firstName: faker.name.firstName(gender),
            middleName: faker.name.middleName(gender),
            dateOfBirth: faker.date.between('1950', '2010')
                .toISOString().split('T').shift(),
            address: `
            ${faker.address.state()},
            ${faker.address.city()},
            ${faker.address.streetName()},
            ${faker.random.number({min: 1, max: 100})}
            `,
            position: faker.name.jobTitle(),
            role: faker.random.arrayElement(roles)
        });

        users.push(user);
    }

    await userRepository.save(users);

}).catch(error => console.log(error));
