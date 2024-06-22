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
import { NotificationsService } from '@/notifications/notifications.service';
import { NotificationType, Role } from '@prisma/client';


@ApiTags('review')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService,
        private notificationsService: NotificationsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create review' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      const review: any =  await this.reviewService.create(createReviewDto);
      
      // Notify the Radiologist that the review has been completed
      const reviewRequest = review.Report.ReviewRequest
      await  this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: reviewRequest.creatorId,
        type: NotificationType.REQUEST_REVIEWED,
        entityId: reviewRequest.id,
      });

      return review
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
