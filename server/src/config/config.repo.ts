import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';

@Injectable()
export class ConfigRepo {
  constructor(private prisma: PrismaService) {}

  async upsert(data: CreateConfigDto) {
    try {
      return await this.prisma.config.upsert({
        where: { key: data.key },
        update: {
          value: data.value,
        },
        create: {
          key: data.key,
          value: data.value,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.prisma.config.findMany();
    } catch (error) {
      throw error;
    }
  }
  async getByKey(key: string) {
    try {
      return await this.prisma.config.findUnique({
        where: {
          key: key,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
