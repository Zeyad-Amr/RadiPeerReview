import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RadiologistService } from './radiologist.service';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
import { UpdateRadiologistDto } from './dto/update-radiologist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('radiologist')
@Controller('radiologist')
export class RadiologistController {
  constructor(private readonly radiologistService: RadiologistService) { }

  @Post()
  create(@Body() createRadiologistDto: CreateRadiologistDto) {
    return this.radiologistService.create(createRadiologistDto);
  }

  @Get()
  findAll() {
    return this.radiologistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radiologistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRadiologistDto: UpdateRadiologistDto) {
    return this.radiologistService.update(+id, updateRadiologistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radiologistService.remove(+id);
  }
}
