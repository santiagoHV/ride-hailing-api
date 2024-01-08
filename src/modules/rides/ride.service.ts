import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ride, RideStatus } from "./ride.entity";
import { Repository } from "typeorm";
import { UserService } from "../users/user.service";
import { RequestRideDto } from "./dtos/requestRide.dto";
import { FinishRideDto } from "./dtos/finishRide.dto";
import { PaymentService } from "../payment-sources/services/payment.services";
import { PaymentStatus } from "../payment-sources/entities/payment.entity";
import { User } from "../users/user.entity";


const EARTH_RADIUS = 6371;


@Injectable()
export class RideService{
    constructor(
        @InjectRepository(Ride) private readonly rideRepository: Repository<Ride>,
        private userService: UserService,
        private paymentService: PaymentService
    ){}

    async requestRide(requestRideDto: RequestRideDto, rider: User){
        const ride = this.rideRepository.create(requestRideDto)
        const driver = await this.findDriver(ride.startLat, ride.startLng)

        ride.driver = driver
        ride.startTime = new Date()
        ride.status = RideStatus.ONROUTE 
        ride.rider = rider

        await this.rideRepository.save(ride)

        return {
            id: ride.id,
            status: ride.status,
            startLat: ride.startLat,
            startLng: ride.startLng,
            driver: {
                name: driver.name,
                lastname: driver.lastname,
            }
        }
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

        if(ride.status === RideStatus.FINISHED){
            throw new BadRequestException("Ride already finished")
        }

        ride.status = RideStatus.FINISHED
        ride.endTime = new Date()
        ride.endLat = finishRideDto.endLat
        ride.endLng = finishRideDto.endLng

        const distance = this.calculateDistance(ride.startLat, ride.startLng, ride.endLat, ride.endLng)
        const time = this.calculateTimeMinutes(ride.startTime, ride.endTime)

        const payment = await this.paymentService.createPayment(
            distance,
            time
        )

        ride.payment = payment

        await this.rideRepository.save(ride)

        return {
            ride,
            payment
        }
    }

    async payRide(id: number){
        const ride = await this.rideRepository.findOne({
            where: { id },
            relations: ['payment']
        })

        if(!ride){
            throw new NotFoundException("Ride not found")
        }

        if(ride.status !== RideStatus.FINISHED){
            throw new BadRequestException("Ride not finished")
        }

        if(ride.payment.status === PaymentStatus.APPROVED){
            throw new BadRequestException("Ride already paid")
        }
        
        await this.paymentService.createTransaction(ride.payment)
        await this.rideRepository.save(ride)

        return {
            ride,
            payment: ride.payment
        }
    }

    async getAllRides(){
        return await this.rideRepository.find(
            {
                relations: ['driver', 'payment', 'rider']
            }
        )
    }

    async getRideById(id: number){
        const ride = await this.rideRepository.findOne({
            where: { id }
        })
        
        if(!ride){
            throw new Error("Ride not found")
        }
    }

    private async findDriver(lat: number, lng: number){
        const activeDrivers = await this.userService.findActiveDrivers()
        console.log('active drivers')
        console.log(activeDrivers)
        // TODO: create logic to find more close driver
        return activeDrivers[0]
    }

    private calculateDistance(startLat: number, startLng: number, endLat: number, endLng: number){
        const dLat = this.degreesToRadians(endLat - startLat);
        const dLng = this.degreesToRadians(endLng - startLng);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
        Math.cos(this.degreesToRadians(startLat)) * Math.cos(this.degreesToRadians(endLat)) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = EARTH_RADIUS * c;

        return distance;
    }

    private degreesToRadians(degrees: number): number{
        const pi = Math.PI;
        const radians = degrees * (pi/180);
        return radians;
    }

    private calculateTimeMinutes(startDate, endDate){
        const time = (endDate - startDate)
        return time;
    }
}