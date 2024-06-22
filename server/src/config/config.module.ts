import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { ConfigRepo } from './config.repo';

@Module({
  controllers: [ConfigController],
  providers: [ConfigService, PrismaService, ConfigRepo],
  exports: [ConfigService],
})
export class ConfigModule {}
