import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    controllers: [],
    providers: [UserService],
})
export class UsersModule {}
