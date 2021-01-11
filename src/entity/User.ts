import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Role} from '../enums/Role'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    middleName: string;

    @Column('date')
    dateOfBirth: string;

    @Column()
    address: string;

    @Column()
    position: string;

    @Column()
    role: Role;
}
