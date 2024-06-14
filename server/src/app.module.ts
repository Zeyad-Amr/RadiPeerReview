import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [AuthModule, DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
