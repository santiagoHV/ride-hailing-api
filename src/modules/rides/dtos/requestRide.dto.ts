import { IsNotEmpty, IsNumber } from "class-validator";

export class RequestRideDto {

    @IsNumber()
    @IsNotEmpty()
    startLat: number;

    @IsNumber()
    @IsNotEmpty()
    startLng: number;

    @IsNumber()
    @IsNotEmpty()
    riderId: number;
}