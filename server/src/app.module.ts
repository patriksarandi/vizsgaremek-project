import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VevoModule } from './vevo/vevo.module';
import { AuthModule } from './auth/auth.module';
import { KategoriaModule } from './kategoria/kategoria.module';
import { TermekModule } from './termek/termek.module';
import { FizetesiKosarModule } from './fizetesi-kosar/fizetesi-kosar.module';
import { RendelesModule } from './rendeles/rendeles.module';

@Module({
  imports: [VevoModule, AuthModule, KategoriaModule, TermekModule, FizetesiKosarModule, RendelesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
