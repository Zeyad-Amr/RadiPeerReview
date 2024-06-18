import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { handleError } from 'src/shared/http-error';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('review')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(private readonly vitalsService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create review' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    try {
      const reviewerId = req.user.sub;
      return await this.vitalsService.create(createReviewDto,reviewerId);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all surgeries' })
  @ApiOkResponse({ description: 'get all surgeries' })
  async findAll( ) {
    try {
      return await this.vitalsService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get review by id' })
  @ApiOkResponse({ description: 'get a review' })
  @ApiNotFoundResponse({ description: 'review not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'update review' })
  // @ApiOkResponse({ description: 'updated successfully' })
  // @ApiNotFoundResponse({ description: 'review not found' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateReviewDto: UpdateReviewDto,
  // ) {
  //   try {
  //     return await this.vitalsService.update(id, updateReviewDto);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'delete review by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'review not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
