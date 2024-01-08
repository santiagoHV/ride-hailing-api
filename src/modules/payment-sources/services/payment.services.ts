import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment, PaymentStatus } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { WompiService } from "src/services/wompi/wompi.service";

//TODO: migrate to admin module
const AMOUNT_PER_KM = 1000;
const AMOUNT_PER_MINUTE = 200;
const MINIMUM_AMOUNT = 3500;
const currency = "COP";


@Injectable()
export class PaymentService{
    constructor(
        @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
        private readonly wompiService: WompiService
    ){}

    async createPayment(distance: number, time: number){
        
        const amount = this.calculateAmount(distance, time)

        const payment = this.paymentRepository.create({
            currency,
            amount,
            creationDate: new Date(),
            status: PaymentStatus.PENDING
        })

        console.log(payment)

        console.log('error en guardado')
        return await this.paymentRepository.save(payment)
    }

    async createTransaction(payment: Payment){
        payment.status = PaymentStatus.APPROVED
        payment.cancellationDate = new Date()
        return await this.paymentRepository.save(payment)
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