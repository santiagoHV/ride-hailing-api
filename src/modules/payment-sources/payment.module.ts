import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentSource } from "./entities/paymentSource.entity";
import { PaymentService } from "./services/payment.services";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Payment,
            PaymentSource
        ])
    ],
    controllers: [],
    providers: [
        PaymentService
    ]
})
export class PaymentModule{}