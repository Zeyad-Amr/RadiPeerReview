import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRepo } from './review.repo';

@Injectable()
export class ReviewService {
  constructor(private reviewRepo: ReviewRepo) {}

  async create(createReviewDto: CreateReviewDto, reviewerId: string) {
    try {
      const review = await this.reviewRepo.createReview(
        createReviewDto,
        reviewerId,
      );
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
