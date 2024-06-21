import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ConfigKeys } from '../entities/config.entity';

export class CreateConfigDto {
  @ApiProperty({ type: String, example: ConfigKeys.ASSIGNMENT_MODE })
  @IsNotEmpty()
  @IsString()
  key: ConfigKeys;

  @ApiProperty({ type: String, example: 'manual' })
  @IsNotEmpty()
  @IsString()
  value: string;
}
