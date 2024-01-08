import { ConfigService } from '@nestjs/config';
import axios from "axios"

export class WompiService {
    private readonly apiUrl: string
    private readonly publicKey: string
    private readonly privateKey: string

    constructor(
        private readonly configService: ConfigService
    ) {
        this.apiUrl = this.configService.get<string>('WOMPI_API_URL')
        this.publicKey = this.configService.get<string>('WOMPI_PUBLIC_KEY')
        this.privateKey = this.configService.get<string>('WOMPI_PRIVATE_KEY')
    }

    async createTransaction(paymentData: any): Promise<any> {
        return this.makeRequest('post', '/transactions', true, paymentData)
    }

    async createCardToken(cardData: any): Promise<any> {
        return this.makeRequest('post', '/tokens/cards', false, cardData)
    }

    async createPaymentMethod(paymentMethodData: any): Promise<any> {
        return this.makeRequest('post', '/payment_sources', true, paymentMethodData)
    }

    private async makeRequest(method: string, path: string,needsPrivateKey: boolean, body?: any): Promise<any> {
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
            return error.response.data
        }
    }
}