import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentSource } from "./entities/paymentSource.entity";
import { PaymentService } from "./services/payment.services";
import { PaymentController } from "./payment.controller";
import { WompiService } from "src/services/wompi/wompi.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Payment,
            PaymentSource
        ])
    ],
    controllers: [
        PaymentController
    ],
    providers: [
        PaymentService,
        WompiService
    ],
    exports: [
        PaymentService
    ]
})
export class PaymentModule{}