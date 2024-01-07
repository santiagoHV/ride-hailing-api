import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/user.entity";
import { Payment } from "./payment.entity";

@Entity()
export class PaymentSource {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    externalId: string

    @Column()
    brand: string

    @Column()
    lastFour: Number

    @ManyToOne(() => User, user => user.paymentSources)
    user: User

    @OneToMany(() => Payment, payment => payment.paymentSource)
    payments: Payment[]

}