import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Role} from '../enums/Role'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column({
        type: "varchar",
        unique: true,
    })
    phone: string;

    @Column()
    password: string;

    @Column('date')
    dateOfBirth: string;

    @Column()
    address: string;

    @Column()
    position: string;

    @Column()
    role: Role;
}
