import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReviewRequestDto } from './create-review-request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewRequestDto {
    @ApiProperty({ description: 'ID of the reviewer', example: '123' })
    @IsNotEmpty()
    @IsString()
    reviewerId:string
}
