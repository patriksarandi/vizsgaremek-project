import { Module } from '@nestjs/common';
import { ErtekelesService } from './ertekeles.service';
import { ErtekelesController } from './ertekeles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ErtekelesController],
  providers: [ErtekelesService, PrismaService],
})
export class ErtekelesModule {}
