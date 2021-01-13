import * as faker from 'faker/locale/ru';
import {createConnection, getRepository, Repository} from "typeorm";
import {User} from "./entity/User";
import {Role} from './enums/Role';

createConnection().then(async connection => {

    console.log("Database seeding...");

    const userRepository: Repository<User> = getRepository(User);
    const users: User[] = [];
    const roles: number[] = [];

    Object.values(Role).forEach((v) => {
        if (typeof v === 'number') {
            roles.push(v);
        }
    });

    for (let i = 1; i < 30; i++) {

        const gender: number = faker.random.arrayElement([0, 1]);

        const user: User = userRepository.create({

            phone: `+${faker.random.number({min: 1, max: 9})}${faker.unique(faker.phone.phoneNumber)}`,
            password: '$2b$04$toP1b1dhS0dtpPicQsWjjeOwzl3pvPAfgHDHMT.FXUDy2fuCd4u86', // password,

            lastName: faker.name.lastName(gender),
            firstName: faker.name.firstName(gender),
            middleName: faker.name.middleName(gender),

            dateOfBirth: faker.date.between('1950', '2010').toISOString().split('T').shift(),
            address: `${faker.address.state()}, ${faker.address.city()}, ${faker.address.streetAddress()}, ${faker.address.secondaryAddress()}`,
            position: faker.name.jobTitle(),

            role: faker.random.arrayElement(roles)
        });

        users.push(user);
    }

    // hardcode for demo access
    userRepository.merge(users[0], {
        phone: '+1(111)111-11-1',
        position: 'Сотрудник',
        role: Role.Employee
    });

    userRepository.merge(users[1], {
        phone: '+2(222)222-22-22',
        position: 'Кадровик',
        role: Role.HR
    });

    userRepository.merge(users[2], {
        phone: '+3(333)333-33-33',
        position: 'Директор',
        role: Role.Director
    });

    await userRepository.save(users);

    console.log("Database seeding completed successfully");

}).catch(error => console.log(error));
