import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment, PaymentStatus } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { WompiApiService } from "src/modules/external-services/wompiApi/wompiApi.service";
import { PaymentSource } from "../entities/paymentSource.entity";

//TODO: migrate to admin module
const AMOUNT_PER_KM = 1000;
const AMOUNT_PER_MINUTE = 200;
const MINIMUM_AMOUNT = 3500;
const currency = "COP";


@Injectable()
export class PaymentService{
    constructor(
        @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(PaymentSource) private readonly paymenSourceRepository: Repository<PaymentSource>,
        private readonly wompiApiService: WompiApiService
    ){}

    async createPayment(distance: number, time: number){
        
        const amount = this.calculateAmount(distance, time)

        const payment = this.paymentRepository.create({
            currency,
            amount,
            creationDate: new Date(),
            status: PaymentStatus.PENDING
        })

        return await this.paymentRepository.save(payment)
    }

    async createTransaction(payment: Payment, paymentSource: PaymentSource){
        payment.paymentSource = paymentSource
        const transaction = await this.wompiApiService.createTransaction(payment)

        console.log(transaction)
        payment.status = PaymentStatus.APPROVED
        payment.cancellationDate = new Date()
        return await this.paymentRepository.save(payment)
    }

    async findPaymentSourceById(payment_source_id: number): Promise<PaymentSource> {
        return await this.paymenSourceRepository.findOne({
            where: { id: payment_source_id },
            relations: ['user']
        })
    }

    async getPaymentById(id: number){
        return await this.paymentRepository.findOne({
            where: { id }
        })
    }

    private calculateAmount(distance, time){
        const amount = (distance * AMOUNT_PER_KM) + (time * AMOUNT_PER_MINUTE) + MINIMUM_AMOUNT;
        return amount;
    }

    
}