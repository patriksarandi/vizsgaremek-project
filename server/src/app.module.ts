import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VevoModule } from './vevo/vevo.module';
import { AuthModule } from './auth/auth.module';
import { KategoriaModule } from './kategoria/kategoria.module';
import { TermekModule } from './termek/termek.module';
import { RendelesModule } from './rendeles/rendeles.module';
import { ErtekelesModule } from './ertekeles/ertekeles.module';

@Module({
  imports: [VevoModule, AuthModule, KategoriaModule, TermekModule, RendelesModule, ErtekelesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
