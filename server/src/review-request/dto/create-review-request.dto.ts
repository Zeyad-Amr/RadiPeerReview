import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateReviewRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'This is a test report' })
  additionalComments: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Result file' })
  result: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Report file' })
  report: any;

  @ApiProperty({
    type: Boolean,
    description: 'auto assignment to random radiologist',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    console.log(value, typeof value);
    if (typeof value === 'boolean') {
      return value;
    }
    if (value?.toString()?.toLowerCase() === 'false') {
      return false;
    }
    if (value?.toString()?.toLowerCase() === 'true') {
      return true;
    }
  })
  autoAssign: boolean;
}
