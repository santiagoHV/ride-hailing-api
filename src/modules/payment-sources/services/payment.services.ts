import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import e from "express";
import { Payment } from "../entities/payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentService{
    constructor(
        @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>
    ){}

    createPayment(
        startLat: Number,
        startLng: Number, 
        endLat: Number,
        endLng: Number,
        startDate: Date, 
        endDate: Date,
        
    ){
        const distance = this.calculateDistance(startLat, startLng, endLat, endLng)
        const time = this.calculateTimeMinutes(startDate, endDate)
        const price = this.calculatePrice(distance, time)

    }

    private calculatePrice(distance, time){
        const price = (distance * 0.5) + (time * 0.1)
        return price;
    }

    private calculateDistance(startLat, startLng, endLat, endLng){
        const radius = 6371;
        const dLat = this.degreesToRadians(endLat - startLat);
        const dLng = this.degreesToRadians(endLng - startLng);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
        Math.cos(this.degreesToRadians(startLat)) * Math.cos(this.degreesToRadians(endLat)) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = radius * c;

        return distance;
    }

    private degreesToRadians(degrees: any): any{
        const pi = Math.PI;
        const radians = degrees * (pi/180);
    }

    private calculateTimeMinutes(startDate, endDate){
        const time = (endDate - startDate)
        return time;
    }
}