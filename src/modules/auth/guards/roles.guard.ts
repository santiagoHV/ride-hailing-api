import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRoles } from "../../users/user.entity";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler())

        if(!roles){
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user

        if(!user || !user.roles){
            throw new ForbiddenException('Access denied')
        }

        return Object.values(UserRoles).includes(user.role)
    }

}