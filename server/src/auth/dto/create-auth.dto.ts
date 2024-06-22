import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateAuthDto implements Prisma.AuthCreateInput {
  @ApiProperty({
    type: String,
    example: 'Admin123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({
    type: String,
    example: 'Admin1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/.*[0-9].*/, {
    message: 'password must contain at least one number',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'password must contain at least one uppercase letter',
  })
  password: string;

  radiologist?: Prisma.RadiologistCreateNestedOneWithoutAuthInput;
}

export class ChangePasswordDto {
  @ApiProperty({ type: String, example: 'Admin1234' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String, example: 'Admin12345' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  // password must contain at least one number and one uppercase letter
  @Matches(/.*[0-9].*/, {
    message: 'password must contain at least one number',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'password must contain at least one uppercase letter',
  })
  newPassword: string;
}
