import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportRepo } from './report.repo';

@Injectable()
export class ReportService {
  constructor(private reportRepo: ReportRepo) {}
  constructor(private reportRepo: ReportRepo) {}

  async saveReport(
    files: { report?: Express.Multer.File[]; result?: Express.Multer.File[] },
    data: CreateReportDto,
  ) {
    try {
      return await this.reportRepo.create({
        reportUrl: this.makeURL(files.report[0].filename),
        resultUrl: this.makeURL(files.result[0].filename),
        additionalComments: data.additionalComments,
        ReviewRequest: data?.reviewRequestId
          ? {
              connect: {
                id: data.reviewRequestId,
              },
            }
          : undefined,
        ReviewRequest: data?.reviewRequestId
          ? {
              connect: {
                id: data.reviewRequestId,
              },
            }
          : undefined,
      });
    } catch (error) {
      throw error;
    }
  }

  makeURL(filename: string) {
    return process.env.BASE_URL + '/api/report/files/' + filename;
  }

  async findAll() {
    try {
      const review = await this.reportRepo.getAll();
      return review;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reportRepo.getByID(id);
      return review;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const review = await this.reportRepo.delete(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
}
