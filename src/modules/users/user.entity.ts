import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ride } from "../rides/ride.entity";
import { PaymentSource } from "../payment-sources/entities/paymentSource.entity";

export const ROLES = ['driver', 'rider', 'admin']

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Ride, ride => ride.driver)
    drivenRides: Ride[]

    @OneToMany(() => Ride, ride => ride.rider)
    riddenRides: Ride[]

    @OneToMany(() => PaymentSource, paymentSource => paymentSource.user)
    paymentSources: PaymentSource[]
}