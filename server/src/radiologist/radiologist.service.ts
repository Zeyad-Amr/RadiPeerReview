import { HttpException, Injectable } from '@nestjs/common';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
import { UpdateRadiologistDto } from './dto/update-radiologist.dto';
import { RadiologistRepo } from './radiologist.repo';
import { hashPassword } from '@/shared/utlis/utils';

@Injectable()
export class RadiologistService {
  constructor(private radiologistRepo: RadiologistRepo) {}

  async create(createRadiologistDto: CreateRadiologistDto): Promise<any> {
    try {
      // check username exists
      const usernameExists = await this.radiologistRepo.usernameExists(
        createRadiologistDto.username,
      );
      if (usernameExists) {
        throw new HttpException('Username already exists', 400);
      }

      // hash password
      const hash = await hashPassword(createRadiologistDto.password);

      createRadiologistDto.password = hash;

      return await this.radiologistRepo.create(createRadiologistDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.radiologistRepo.getAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.radiologistRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    try {
      return this.radiologistRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
