import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { PaymentSource } from "../payment-sources/entities/paymentSource.entity";
import { Payment } from "../payment-sources/entities/payment.entity";

export enum RideStatus {
    ONROUTE = 'ONROUTE',
    FINISHED = 'FINISHED'
}

@Entity()
export class Ride {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'double precision' })
    startLat: number

    @Column({ type: 'double precision' })
    startLng: number

    @Column({ type: 'double precision', nullable: true })
    endLat: number

    @Column({ type: 'double precision', nullable: true })
    endLng: number

    @Column({ type: 'timestamp'})
    startTime: Date

    @Column({ type: 'timestamp', nullable: true})
    endTime: Date

    @Column({ type: 'enum', enum: RideStatus })
    status: RideStatus

    @ManyToOne(() => User, user => user.drivenRides)
    driver: User

    @ManyToOne(() => User, user => user.riddenRides)
    rider: User

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment
}