import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentSource } from "./entities/paymentSource.entity";
import { PaymentService } from "./services/payment.services";
import { PaymentController } from "./payment.controller";
import { WompiApiModule } from "../external-services/wompiApi/wompiApi.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Payment,
            PaymentSource
        ]),
        WompiApiModule
    ],
    controllers: [
        PaymentController
    ],
    providers: [
        PaymentService,
    ],
    exports: [
        PaymentService
    ]
})
export class PaymentModule{}