import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const token = this.extractTokenFromRequest(request)

        try{
            const decoded = jwt.verify(token, 'secretKey')

            request.user = decoded
        }catch(error){
            throw new ForbiddenException('Token invalid')
        }

        return super.canActivate(context)
    }

    private extractTokenFromRequest(request: any): string{
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new UnauthorizedException('Token not found')
        }

        const token = authHeader.split(' ')[1]

        if(!token){
            throw new UnauthorizedException('Token not found')
        }

        return token
    }

}
