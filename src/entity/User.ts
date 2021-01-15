import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Role} from '../enums/Role'
import {IsDateString, IsIn, Length} from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 50)
    firstName: string;

    @Column()
    @Length(2, 50)
    middleName: string;

    @Column()
    @Length(2, 50)
    lastName: string;

    @Column({
        type: "varchar",
        unique: true,
    })
    @Length(15, 17)
    phone: string;

    @Column()
    @Length(6, 100)
    password: string;

    @Column('date')
    @IsDateString()
    dateOfBirth: string;

    @Column()
    @Length(10, 100)
    address: string;

    @Column()
    @Length(2, 100)
    position: string;

    @Column({
        type: "enum",
        enum: Role
    })
    @IsIn(Object.values(Role).filter(v => typeof v === 'number'))
    role: Role;
}
