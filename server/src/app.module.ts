import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VevoModule } from './vevo/vevo.module';
import { AuthModule } from './auth/auth.module';
import { KategoriaModule } from './kategoria/kategoria.module';
import { TermekModule } from './termek/termek.module';

@Module({
  imports: [VevoModule, AuthModule, KategoriaModule, TermekModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
