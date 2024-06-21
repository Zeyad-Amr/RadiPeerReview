import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { ConfigRepo } from './config.repo';

@Injectable()
export class ConfigService {
  constructor(private configRepo: ConfigRepo) {}
  async create(createConfigDto: CreateConfigDto) {
    try {
      await this.configRepo.upsert(createConfigDto);
      return await this.setConfig();
    } catch (error) {
      throw error;
    }
  }

  async findOneByKey(key: string) {
    try {
      return await this.configRepo.getByKey(key);
    } catch (error) {
      throw error;
    }
  }

  private configCache: Map<string, any> = new Map();

  async getConfig(key: string) {
    if (this.configCache.has(key)) {
      return this.configCache.get(key);
    }

    const config = await this.findOneByKey(key);
    if (!config) {
      return null;
    }
    this.configCache.set(key, config);

    return config;
  }

  async setConfig() {
    try {
      const config = await this.configRepo.getAll();
      config.forEach((c) => {
        this.configCache.set(c.key, c.value);
      });
      return config;
    } catch (error) {
      throw error;
    }
  }
}
