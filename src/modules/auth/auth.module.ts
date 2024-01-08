import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: "secretKey",
        })

    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        PassportModule,
        JwtModule,
        AuthService
    ]
})
export class AuthModule {}