import { Module } from '@nestjs/common';
import { RendelesService } from './rendeles.service';
import { RendelesController } from './rendeles.controller';

@Module({
  controllers: [RendelesController],
  providers: [RendelesService],
})
export class RendelesModule {}
