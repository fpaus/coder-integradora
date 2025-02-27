import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class SessionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.usersService.findOneByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this.verifyPassword(body.password, user.password);
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  public async register(body: CreateUserDto) {
    const usuarioExists = await this.usersService.findOneByEmail(body.email);
    if (usuarioExists) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(body.password);
    const result = await this.usersService.create({
      ...body,
      password: hashedPassword,
    });
    return result._id;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }
}
