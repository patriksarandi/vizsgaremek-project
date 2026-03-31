import { Module } from '@nestjs/common';
import { TermekService } from './termek.service';
import { TermekController } from './termek.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TermekController],
  providers: [TermekService, PrismaService],
})
export class TermekModule {}
