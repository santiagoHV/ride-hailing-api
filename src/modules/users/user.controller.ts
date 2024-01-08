import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserRoles } from "./user.entity";
import { Roles } from "../auth/decorator/auth.decorator";

@Controller('api/v1/users')
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRoles.RIDER)
    @Get('/my-payments')
    async getUserPayments(@Req() request: any){
        const user = request.user;
        return await this.userService.findUserPayments(user);
    }
}