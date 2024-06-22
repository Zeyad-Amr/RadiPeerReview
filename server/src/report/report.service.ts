import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportRepo } from './report.repo';
import { NotificationsService } from '@/notifications/notifications.service';
import { NotificationType, Role } from '@prisma/client';
import { ReviewRequestService } from '@/review-request/review-request.service';

@Injectable()
export class ReportService {
  constructor(
    private reportRepo: ReportRepo,
    private notificationsService: NotificationsService,
    private reviewRequestService: ReviewRequestService,
  ) {}

  async saveReport(
    files: { report?: Express.Multer.File[]; result?: Express.Multer.File[] },
    data: CreateReportDto,
  ) {
    try {
      const report = await this.reportRepo.create({
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
      });

      // Get Review Request
      const reviewRequest = await this.reviewRequestService.findOne(
        data.reviewRequestId,
      );

      // Notify the Radiologist that the report has been re-submitted
      this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: reviewRequest.reviewerId,
        type: NotificationType.REQUEST_REPORT_RESUBMITTED,
        entityId: reviewRequest.id,
      });
      return report;
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
