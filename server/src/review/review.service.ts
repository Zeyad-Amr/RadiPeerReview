import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepo } from './review.repo';
import { ReviewRequestRepo } from '@/review-request/review-request.repo';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepo: ReviewRepo,
    private reviewRequestRepo:ReviewRequestRepo
  ) {}

  async create(createReviewDto: CreateReviewDto,creatorId:string) {
    try {
      const request =await this.reviewRequestRepo.getOne({
        report:{
          some:{
            id:createReviewDto.reportId
          }
        }
      })
      if(creatorId !== request.reviewerId) throw new UnauthorizedException("Review not assigned to current user")
      const review = await this.reviewRepo.createReview(createReviewDto);
      return review;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const review = await this.reviewRepo.getAll();
      return review;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewRepo.getByID(id);
      return review;
    } catch (error) {
      throw error;
    }
  }

  // async update(id: string, updateReviewDto: UpdateReviewDto) {
  //   try {
  //     const review = await this.reviewRepo.update(id,updateReviewDto);
  //     return review;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async remove(id: string) {
    try {
      const review = await this.reviewRepo.delete(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
}
