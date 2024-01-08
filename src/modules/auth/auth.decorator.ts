import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../users/user.entity";

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles)