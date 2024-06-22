import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from '@prisma/client';

export class UpdateRadiologistDto {
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
    type: () => [String],
    enum: Specialization,
    example: [Specialization.NEURORADIOLOGY],
  })
  @IsNotEmpty()
  specializations: Specialization[];

  @ApiProperty({
    type: String,
    example: '+201098157522',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
