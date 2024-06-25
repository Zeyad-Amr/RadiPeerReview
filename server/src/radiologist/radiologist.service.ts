import { HttpException, Injectable } from '@nestjs/common';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
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

  async findAll() {
    try {
      let radioligists = await this.radiologistRepo.getAll();
      radioligists.map((radioligist) => delete radioligist.auth.password);
      return radioligists
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const radioligist:any = await this.radiologistRepo.getByID(id);
      delete radioligist.auth.password;
      return radioligist
    } catch (error) {
      throw error;
    }
  }

  async deativate(id: string) {
    try {
      return await this.radiologistRepo.deativate(id);
    } catch (error) {
      throw error;
    }
  }

  async activate(id: string) {
    try {
      return await this.radiologistRepo.activate(id);
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: any) {
    try {
      return await this.radiologistRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
