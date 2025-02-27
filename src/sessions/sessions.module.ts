import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `500s`,
        },
      }),
    }),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
