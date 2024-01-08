import { Controller, Get, Param, Req, Request, UseGuards } from "@nestjs/common";
import { PaymentService } from "./services/payment.services";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorator/auth.decorator";
import { UserRoles } from "../users/user.entity";

@Controller("api/v1/payments")
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) {}

    @Get(':id')
    async getPaymentById(@Param('id') id: number){
        return await this.paymentService.getPaymentById(id);
    }
}

