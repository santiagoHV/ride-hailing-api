import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
import { UserService } from "src/modules/users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secretKey"
        })
    }

    async validate(payload: any){
        const user = await this.userService.findById(payload.sub);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }
}