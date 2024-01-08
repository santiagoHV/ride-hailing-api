import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SingupDto } from "../auth/dtos/signup.dto";
import * as bcrypt from "bcryptjs";
import { User, UserRoles } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async findByEmail(email: string){
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async findById(id: number){
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async findUserPayments(user: User){
        const completeUser = await this.userRepository.findOne({
            where: { id: user.id },
            relations: ['riddenRides', 'riddenRides.payment']
        })
        let rides = completeUser.riddenRides
        const payments = rides.map(ride => ride.payment);
        return payments;
    }

    async findActiveDrivers(){
        //TODO: create logic to find active drivers
        const drivers = await this.userRepository.find({
            where: { role: UserRoles.DRIVER }
        })

        if(!drivers){
            throw new BadRequestException("No active drivers found")
        }
        return drivers
    }

    async create(signupDto: SingupDto) {
        const hashPassword = await bcrypt.hash(signupDto.password, 12);

        if (!(Object.values(UserRoles).includes(signupDto.role))) {
            throw new BadRequestException(`Invalid role: ${signupDto.role}`);
          }

        const role = signupDto.role as UserRoles;

        const user = this.userRepository.create({
            email: signupDto.email,
            name: signupDto.name,
            lastname: signupDto.lastname,
            password: hashPassword,
            role: role
        })

        await this.userRepository.save(user);
        return user;
    }

    async comparePasswords(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}