import { RolesGuard } from './../auth/role.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RadiologistService } from './radiologist.service';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
import { UpdateRadiologistDto } from './dto/update-radiologist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { handleError } from '@/shared/http-error';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/role.enum';

@ApiBearerAuth()
@ApiTags('radiologist')
@Controller('radiologist')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class RadiologistController {
  constructor(private readonly radiologistService: RadiologistService) {}

  @Post()
  async create(@Body() createRadiologistDto: CreateRadiologistDto) {
    try {
      return await this.radiologistService.create(createRadiologistDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.radiologistService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.radiologistService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRadiologistDto: UpdateRadiologistDto,
  // ) {
  //   return this.radiologistService.update(+id, updateRadiologistDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.radiologistService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
