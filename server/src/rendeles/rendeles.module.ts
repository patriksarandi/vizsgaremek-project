import { Module } from '@nestjs/common';
import { RendelesService } from './rendeles.service';
import { RendelesController } from './rendeles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RendelesController],
  providers: [RendelesService, PrismaService],
})
export class RendelesModule {}
