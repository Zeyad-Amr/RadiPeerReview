import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { handleError } from '@/shared/http-error';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/role.guard';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/role.enum';
import { Public } from '@/shared/decorators/public.decorator';

// @UseGuards(RolesGuard)
// @Roles(Role.Admin)
@ApiTags('config')
@ApiBearerAuth()
@Public()
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  async create(@Body() createConfigDto: CreateConfigDto) {
    try {
      return await this.configService.create(createConfigDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    try {
      return this.configService.findOneByKey(key);
    } catch (error) {
      throw handleError(error);
    }
  }
}
