import { Body, Injectable } from '@nestjs/common';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReviewRequestRepo } from './review-request.repo';

@Injectable()
export class ReviewRequestService {
  constructor(private reviewRequestRepo: ReviewRequestRepo) { }

  async createReviewRequest(
    reportId:string,
    creatorId: string
  ) {    
    try {
      return await this.reviewRequestRepo.create({
        report:{
          connect:{
            id:reportId
          }
        },
        creator:{
          connect:{
            id:creatorId
          }
        }
      });
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const review = await this.reviewRequestRepo.getAll();
      return review;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewRequestRepo.getByID(id);
      return review;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const review = await this.reviewRequestRepo.delete(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
}
