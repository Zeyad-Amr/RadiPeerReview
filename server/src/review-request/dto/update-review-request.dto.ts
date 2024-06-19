import { PartialType } from '@nestjs/swagger';
import { CreateReviewRequestDto } from './create-review-request.dto';

export class UpdateReviewRequestDto extends PartialType(CreateReviewRequestDto) {}
