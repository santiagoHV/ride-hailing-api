import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ride } from "./ride.entity";
import { RideService } from "./ride.service";
import { RideController } from "./ride.controller";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Ride]),
        UsersModule
    ],
    controllers: [RideController],
    providers: [RideService],
})
export class RidesModule{}