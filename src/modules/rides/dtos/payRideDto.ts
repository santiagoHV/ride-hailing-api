import { IsNotEmpty, IsNumber } from "class-validator";

export class PayRideDto {
    @IsNotEmpty()
    @IsNumber()
    paymentSourceId: number;
}