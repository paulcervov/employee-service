import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Role} from './enums/Role';

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.middleName = "Петрович";
    user.dateOfBirth = "1990-01-05";
    user.address = "Улица Пушкина, дом Калатушкина.";
    user.position = 'Директор по продажам';
    user.role = Role.Director;


    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
