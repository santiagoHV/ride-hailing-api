import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from "axios"
import { Payment } from 'src/modules/payment-sources/entities/payment.entity';

const TRANSACTIONS_PATH = '/transactions'

@Injectable()
export class WompiApiService {
    private readonly apiUrl: string
    private readonly publicKey: string
    private readonly privateKey: string
    private readonly secretIntegrity: string

    constructor(
        private readonly configService: ConfigService
    ) {
        this.apiUrl = this.configService.get<string>('WOMPI_API_URL')
        this.publicKey = this.configService.get<string>('WOMPI_PUBLIC_KEY')
        this.privateKey = this.configService.get<string>('WOMPI_PRIVATE_KEY')
        this.secretIntegrity = this.configService.get<string>('WOMPI_SECRET_INTEGRITY')
    }

    async createTransaction(paymentData: Payment): Promise<any> {
        const reference = `ride-${paymentData.id}-pay`
        const amount = Math.trunc(paymentData.amount * 100)
        const concatedData = `${reference}${amount}${paymentData.currency}${this.secretIntegrity}`
        const signature = await this.createSignature(concatedData)

        const body = {
            signature,
            amount_in_cents: amount,
            currency: paymentData.currency,
            customer_email: paymentData.paymentSource.user.email,
            reference,
            payment_method: {
                installments: 1,
            },
            payment_source_id: parseInt(paymentData.paymentSource.externalId),
        }

        return this.makeRequest('post', TRANSACTIONS_PATH, true, body)
    }

    async createCardToken(cardData: any): Promise<any> {
        return this.makeRequest('post', '/tokens/cards', false, cardData)
    }

    async createPaymentMethod(paymentMethodData: any): Promise<any> {
        return this.makeRequest('post', '/payment_sources', true, paymentMethodData)
    }

    private async makeRequest(method: string, path: string, needsPrivateKey: boolean, body?: any): Promise<any> {

        try{
            const response = await axios({
                method,
                url: `${this.apiUrl}${path}`,
                headers: {
                    Authorization: `Bearer ${needsPrivateKey ? this.privateKey : this.publicKey}`
                },  
                data: body
            })
            return response.data
        }
        catch(error){
            console.log(error.response.data.error.messages)
            throw error
        }
    }

    private async createSignature(concatedData: string){
        const encondedText = new TextEncoder().encode(concatedData)
        const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        return hashHex
    }


}