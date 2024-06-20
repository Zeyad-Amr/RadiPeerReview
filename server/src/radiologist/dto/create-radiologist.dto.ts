import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Specialization } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRadiologistDto implements Prisma.RadiologistCreateInput {
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

  @ApiProperty({
    type: String,
    example: 'ahmed123',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
