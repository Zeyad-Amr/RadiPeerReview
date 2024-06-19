import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RadiologistService } from './radiologist.service';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
import { UpdateRadiologistDto } from './dto/update-radiologist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { handleError } from '@/shared/http-error';

@ApiBearerAuth()
@ApiTags('radiologist')
@Controller('radiologist')
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
  findAll() {
    try {
      return this.radiologistService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.radiologistService.findOne(id);
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
  remove(@Param('id') id: string) {
    try {
      return this.radiologistService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
