import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto implements Prisma.DoctorCreateInput {
  @ApiProperty({
    type: String,
    example: 'Ahmed',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  fname: string;

  @ApiProperty({
    type: String,
    example: 'Mohamed',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lname: string;

  @ApiProperty({
    type: String,
    example: 'ahmed@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'X-Ray',
  })
  @IsNotEmpty()
  @IsString()
  specialization: string;

  @ApiProperty({
    type: String,
    example: '+201098157522',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
