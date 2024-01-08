import { UserRoles } from "src/modules/users/user.entity";

export class SingupDto {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: UserRoles;
}