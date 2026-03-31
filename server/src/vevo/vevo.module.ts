import { Module } from '@nestjs/common';
import { VevoService } from './vevo.service';
import { VevoController } from './vevo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VevoController],
  providers: [VevoService, PrismaService],
  exports: [VevoService],
})
export class VevoModule {}
