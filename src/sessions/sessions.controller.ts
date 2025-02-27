import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from './auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('current')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  current(
    @Req()
    req: Request & {
      user: {
        email: string;
        sub: string;
      };
    },
  ) {
    return req.user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    return this.sessionsService.login(body);
  }

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.sessionsService.register(body);
  }
}
