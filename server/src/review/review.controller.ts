import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { handleError } from 'src/shared/http-error';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create review' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      return await this.reviewService.create(createReviewDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all reviews' })
  @ApiOkResponse({ description: 'get all reviews' })
  async findAll() {
    try {
      return await this.reviewService.findAll();
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
      return await this.reviewService.findOne(id);
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
  //     return await this.reviewService.update(id, updateReviewDto);
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
      return await this.reviewService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
