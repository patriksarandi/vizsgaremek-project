import { Module } from '@nestjs/common';
import { VevoService } from './vevo.service';
import { VevoController } from './vevo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VevoController],
  providers: [VevoService, PrismaService], // Ezek a belső elemek
  exports: [VevoService],
})
export class VevoModule {}
