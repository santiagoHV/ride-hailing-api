import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { PaymentSource } from "../payment-sources/entities/paymentSource.entity";
import { Payment } from "../payment-sources/entities/payment.entity";

@Entity()
export class Ride {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'double precision' })
    startLat: number

    @Column({ type: 'double precision' })
    startLng: number

    @Column({ type: 'double precision' })
    endLat: number

    @Column({ type: 'double precision' })
    endLng: number

    @Column({ type: 'timestamp'})
    startTime: Date

    @Column({ type: 'timestamp'})
    endTime: Date

    @ManyToOne(() => User, user => user.drivenRides)
    driver: User

    @ManyToOne(() => User, user => user.riddenRides)
    rider: User

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment
}