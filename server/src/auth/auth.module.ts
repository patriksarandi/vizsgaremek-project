
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { VevoModule } from '../vevo/vevo.module';
import { PrismaService } from 'src/prisma.service';
import { VevoService } from 'src/vevo/vevo.service';

@Module({
  imports: [VevoModule],
  controllers: [AuthController],
  providers: [AuthService, VevoService, PrismaService],
})
export class AuthModule {}