import { Injectable } from '@nestjs/common';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
import { UpdateRadiologistDto } from './dto/update-radiologist.dto';

@Injectable()
export class RadiologistService {
  create(createRadiologistDto: CreateRadiologistDto) {
    return 'This action adds a new radiologist';
  }

  findAll() {
    return `This action returns all radiologist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} radiologist`;
  }

  update(id: number, updateRadiologistDto: UpdateRadiologistDto) {
    return `This action updates a #${id} radiologist`;
  }

  remove(id: number) {
    return `This action removes a #${id} radiologist`;
  }
}
