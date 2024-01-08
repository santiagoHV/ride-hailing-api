import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RideService } from "./ride.service";
import { FinishRideDto } from "./dtos/finishRide.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorator/auth.decorator";
import { UserRoles } from "../users/user.entity";

@Controller("ride")
export class RideController{
    constructor(
        private readonly rideService: RideService
    ){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRoles.RIDER)
    @Post('request')
    async requestRide(@Body() requestRideDto: any){
        return await this.rideService.requestRide(requestRideDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRoles.DRIVER)
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