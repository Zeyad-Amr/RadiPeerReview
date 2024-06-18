import { Module } from '@nestjs/common';
import { RadiologistService } from './radiologist.service';
import { RadiologistController } from './radiologist.controller';

@Module({
  controllers: [RadiologistController],
  providers: [RadiologistService],
})
export class RadiologistModule { }
