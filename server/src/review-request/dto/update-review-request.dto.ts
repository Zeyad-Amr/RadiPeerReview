import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewRequestDto {
  @ApiProperty({ description: 'ID of the reviewer', example: '123' })
  @IsNotEmpty()
  @IsString()
  reviewerId: string;
}
