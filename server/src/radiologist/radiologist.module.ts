import { Module } from '@nestjs/common';
import { RadiologistService } from './radiologist.service';
import { RadiologistController } from './radiologist.controller';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { RadiologistRepo } from './radiologist.repo';

@Module({
  controllers: [RadiologistController],
  providers: [RadiologistService, RadiologistRepo, PrismaService],
})
export class RadiologistModule {}
