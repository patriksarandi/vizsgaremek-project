
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { VevoModule } from '../vevo/vevo.module';
import { PrismaService } from 'src/prisma.service';
import { VevoService } from 'src/vevo/vevo.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    VevoModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ??
          'vizsgaremek-dev-secret-change-me',
        signOptions: { expiresIn: Number(configService.get<string>('JWT_EXPIRES_IN_SECONDS') ?? 86400) },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, VevoService, PrismaService, JwtStrategy],
})
export class AuthModule {}