import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentSource } from "./paymentSource.entity";
import { Ride } from "../../rides/ride.entity";

export enum PaymentStatus{
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}


@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'double precision'})
    amount: number

    @Column()
    currency: string

    @Column({ type: 'timestamp'})
    creationDate: Date

    @Column({ type: 'timestamp', nullable: true})
    cancellationDate: Date

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING})
    status: PaymentStatus

    @ManyToOne(() => PaymentSource, paymentSource => paymentSource.payments, { nullable: true })
    paymentSource: PaymentSource

    @OneToOne(() => Ride)
    ride: Ride
}