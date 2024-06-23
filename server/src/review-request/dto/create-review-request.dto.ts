import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'Mamogram Exam' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'This is a test report' })
  additionalComments: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Result file' })
  result: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Report file' })
  report: any;
}
