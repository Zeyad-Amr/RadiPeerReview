// import { PatientDto } from "@/patient/dto/create-patient.dto";
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';
import { CreateRadiologistDto } from '@/radiologist/dto/create-radiologist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ type: CreateRadiologistDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateRadiologistDto)
  radiologist: CreateRadiologistDto;

  @ApiProperty({ type: CreateAuthDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAuthDto)
  auth: CreateAuthDto;
}
