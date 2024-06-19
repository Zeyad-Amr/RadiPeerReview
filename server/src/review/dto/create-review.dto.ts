import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsObject,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';


class MissedFindingDto {
    @ApiProperty({
      type: String,
      example:"Small lesion in the lower left lobe was missed.",
      description: 'Description of the missed finding',
    })
    @IsString()
    description: string;
  }
class AccuracyOfFindingsDto {
  @ApiProperty({ description: 'Correctness of findings', example: true })
  @IsNotEmpty()
  correctnessOfFindings: boolean;

  @ApiProperty({
    description: 'Comments on accuracy',
    example: 'The findings were accurate.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnAccuracy?: string;

  @ApiProperty({
    type:[MissedFindingDto],
    description: 'Missed findings',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MissedFindingDto)
  MissedFindings?: MissedFindingDto[];
}


class ClarityAndCompletenessDto {
  @ApiProperty({ description: 'Clarity of language', example: 4 })
  @IsNumber()
  @Min(1)
  @Max(5)
  clarityOfLanguage: number;

  @ApiProperty({
    description: 'Comments on language clarity',
    example: 'The language used is easy to understand.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnLanguage?: string;

  @ApiProperty({ description: 'Completeness of report', example: 3 })
  @IsNumber()
  @Min(1)
  @Max(5)
  completenessOfReport: number;

  @ApiProperty({
    description: 'Comments on report completeness',
    example: 'Some sections could be more detailed.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnCompleteness?: string;
}

class ImpressionAndRecommendationsDto {
  @ApiProperty({ description: 'Accuracy of impression', example: true })
  @IsNotEmpty()
  accuracyOfImpression: boolean;

  @ApiProperty({
    description: 'Comments on impression',
    example: 'The impression is well-supported by findings.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnImpression?: string;

  @ApiProperty({
    description: 'Appropriateness of recommendations',
    example: 4,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  appropriatenessOfRecommendations: number;

  @ApiProperty({
    description: 'Suggestions for recommendations',
    example: 'Consider additional tests for confirmation.',
    required: false,
  })
  @IsString()
  @IsOptional()
  suggestionsForRecommendations?: string;
}

class TechnicalQualityDto {
  @ApiProperty({ description: 'Imaging technique', example: 4 })
  @IsNumber()
  @Min(1)
  @Max(5)
  imagingTechnique: number;

  @ApiProperty({
    description: 'Comments on imaging technique',
    example: 'High-quality imaging techniques were employed.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnTechnique?: string;

  @ApiProperty({ description: 'Image quality', example: 3 })
  @IsNumber()
  @Min(1)
  @Max(5)
  imageQuality: number;

  @ApiProperty({
    description: 'Comments on image quality',
    example: 'Some images were slightly blurry.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnImageQuality?: string;
}

class ComplianceAndStandardizationDto {
  @ApiProperty({ description: 'Adherence to guidelines', example: true })
  @IsNotEmpty()
  adherenceToGuidelines: boolean;

  @ApiProperty({
    description: 'Comments on compliance',
    example: 'The report adheres to established guidelines.',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentsOnCompliance?: string;
}

class OverallAssessmentDto {
  @ApiProperty({ description: 'Overall quality', example: 4 })
  @IsNumber()
  @Min(1)
  @Max(5)
  overallQuality: number;

  @ApiProperty({
    description: 'General comments',
    example: 'The report meets expectations overall.',
    required: false,
  })
  @IsString()
  @IsOptional()
  generalComments?: string;
}

export class CreateReviewDto {
  @ApiProperty({ description: 'ID of the report', example: '123' })
  @IsNotEmpty()
  @IsString()
  reportId: string;

  @ApiProperty({
    description: 'Feedback to the radiologist',
    example: 'The report was clear and concise.',
    required: false,
  })
  @IsString()
  @IsOptional()
  feedbackToRadiologist?: string;

  @ApiProperty({
    description: 'Additional comments from the reviewer',
    example: 'The findings were well-explained.',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalReviewerComments?: string;

  @ApiProperty({
    description: 'Accuracy of findings',
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => AccuracyOfFindingsDto)
  accuracyOfFindings?: AccuracyOfFindingsDto;

  @ApiProperty({
    description: 'Clarity and completeness of the report',
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ClarityAndCompletenessDto)
  clarityAndCompleteness?: ClarityAndCompletenessDto;

  @ApiProperty({
    description: 'Impression and recommendations',
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ImpressionAndRecommendationsDto)
  impressionAndRecommendations?: ImpressionAndRecommendationsDto;

  @ApiProperty({
    description: 'Technical quality of the report',
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => TechnicalQualityDto)
  technicalQuality?: TechnicalQualityDto;

  @ApiProperty({
    description: 'Overall assessment of the report',
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => OverallAssessmentDto)
  overallAssessment?: OverallAssessmentDto;

  @ApiProperty({
    description: 'Compliance and standardization',
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ComplianceAndStandardizationDto)
  complianceAndStandardization?: ComplianceAndStandardizationDto;
}
