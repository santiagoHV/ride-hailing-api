import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { RideService } from "./ride.service";
import { FinishRideDto } from "./dtos/finishRide.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorator/auth.decorator";
import { UserRoles } from "../users/user.entity";
import { PaymentSource } from "../payment-sources/entities/paymentSource.entity";
import { PayRideDto } from "./dtos/payRideDto";

@Controller("api/v1/ride")
export class RideController{
    constructor(
        private readonly rideService: RideService
    ){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRoles.RIDER)
    @Post('request')
    async requestRide(@Body() requestRideDto: any, @Req() request: any){
        const rider = request.user;
        return await this.rideService.requestRide(requestRideDto, rider);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRoles.DRIVER)
    @Post(':id/finish')
    async finishRide(@Body() finishRideDto: FinishRideDto, @Param('id') id: number){
        return await this.rideService.finishRide(finishRideDto, id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRoles.RIDER)
    @Post(':id/pay')
    async payRide(@Body() payRideDto: PayRideDto,@Param('id') id: number){
        return await this.rideService.payRide(id, payRideDto.paymentSourceId);
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