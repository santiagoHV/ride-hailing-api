import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentSource } from "./paymentSource.entity";
import { Ride } from "../../rides/ride.entity";

@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    currency: string

    @Column({ type: 'timestamp'})
    date: Date

    @ManyToOne(() => PaymentSource, paymentSource => paymentSource.payments)
    paymentSource: PaymentSource

    @OneToOne(() => Ride)
    ride: Ride
}