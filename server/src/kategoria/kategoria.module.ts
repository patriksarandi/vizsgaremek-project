import { Module } from '@nestjs/common';
import { KategoriaService } from './kategoria.service';
import { KategoriaController } from './kategoria.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KategoriaController],
  providers: [KategoriaService, PrismaService],
})
export class KategoriaModule {}
