import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VevoModule } from './vevo/vevo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [VevoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
