import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRideDto } from "./dtos/createRide.dto";
import { Ride, RideStatus } from "./ride.entity";
import { Repository } from "typeorm";
import { UserService } from "../users/user.service";
import { RequestRideDto } from "./dtos/requestRide.dto";
import { FinishRideDto } from "./dtos/finishRide.dto";

@Injectable()
export class RideService{
    constructor(
        @InjectRepository(Ride) private readonly rideRepository: Repository<Ride>,
        private userService: UserService
    ){}

    async requestRide(requestRideDto: RequestRideDto){
        const ride = this.rideRepository.create(requestRideDto)
        const driver = this.findDriver(ride.startLat, ride.startLng)

        ride.driver = driver
        ride.startTime = new Date()
        ride.status = RideStatus.ONROUTE 

        return this.rideRepository.save(ride)
    }

    async finishRide(finishRideDto: FinishRideDto, id: number){
        const rides = await this.rideRepository.find()
        console.log(rides.find(ride => ride.id === id))

        const ride = await this.rideRepository.findOne({
            where: { id }
        })

        if(!ride){
            throw new NotFoundException("Ride not found")
        }

        ride.status = RideStatus.FINISHED
        ride.endTime = new Date()
        ride.endLat = finishRideDto.endLat
        ride.endLng = finishRideDto.endLng

        //create payment

        return this.rideRepository.save(ride)
    }

    async getAllRides(){
        return await this.rideRepository.find()
    }

    async getRideById(id: number){
        const ride = await this.rideRepository.findOne({
            where: { id }
        })
        
        if(!ride){
            throw new Error("Ride not found")
        }
    }

    async createRide(createRideDto: CreateRideDto){
        const ride = this.rideRepository.create(createRideDto)
        return this.rideRepository.save(ride)
    }

    private findDriver(lat: number, lng: number){
        const activeDrivers = this.userService.findActiveDrivers()
        // TODO: create logic to find more close driver
        return activeDrivers[0]
    }
}