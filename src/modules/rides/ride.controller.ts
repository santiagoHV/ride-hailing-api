import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RideService } from "./ride.service";
import { FinishRideDto } from "./dtos/finishRide.dto";

@Controller("ride")
export class RideController{
    constructor(
        private readonly rideService: RideService
    ){}

    @Post('request')
    async requestRide(@Body() requestRideDto: any){
        return await this.rideService.requestRide(requestRideDto);
    }

    @Post(':id/finish')
    async finishRide(@Body() finishRideDto: FinishRideDto, @Param('id') id: number){
        return await this.rideService.finishRide(finishRideDto, id);
    }

    @Get()
    async getAllRides(){
        return await this.rideService.getAllRides();
    }

    @Get(':id')
    async getRideById(@Param('id') id: number){
        return await this.rideService.getRideById(id);
    }

}