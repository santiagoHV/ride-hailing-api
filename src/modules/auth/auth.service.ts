import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { SingupDto } from './dtos/signup.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async signup(signupDto: SingupDto): Promise<Object> {
    const existingUser = await this.userService.findByEmail(signupDto.email)
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user: User = await this.userService.create(signupDto);
    const token = await this.createToken(user.id, user.email, user.role);


    return {
      token, 
      user: {
        id: user.id,
        name: user.name, 
        lastname: user.lastname, 
        email: user.email, 
        role: user.role
      }};
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await this.userService.comparePasswords(password, user.password);
    if (!validPassword) {
      throw new ForbiddenException('Invalid password');
    }

    return this.createToken(user.id, user.email, user.role);
  }

  async createToken(userId: number, email: string, role: string): Promise<string> {
    const payload = { sub: userId, email, role };
    return this.jwtService.sign(payload);
  }
}