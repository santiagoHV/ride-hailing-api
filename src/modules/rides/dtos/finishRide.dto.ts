import { IsNotEmpty, IsNumber } from "class-validator";

export class FinishRideDto {

    @IsNumber()
    @IsNotEmpty()
    endLat: number;

    @IsNumber()
    @IsNotEmpty()
    endLng: number;
}