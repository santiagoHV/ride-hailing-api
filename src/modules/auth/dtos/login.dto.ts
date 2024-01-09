import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}