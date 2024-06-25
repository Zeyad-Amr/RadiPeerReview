import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReportService } from '@/report/report.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { handleError } from '@/shared/http-error';
import { NotificationsService } from '@/notifications/notifications.service';
import { ConfigService } from '@/config/config.service';
import { ConfigKeys } from '@/config/entities/config.entity';
import { NotificationType, Role } from '@prisma/client';
import { ApproveReqDto } from './dto/approve-review-request.dto';

const UPLOAD_PATH = process.env.UPLOAD_DIR;
@ApiBearerAuth()
@ApiTags('review-request')
@Controller('review-request')
export class ReviewRequestController {
  constructor(
    private readonly reviewRequestService: ReviewRequestService,
    private reportService: ReportService,
    private notificationsService: NotificationsService,
    private configService: ConfigService,
  ) {}

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'report', maxCount: 1 },
        { name: 'result', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = UPLOAD_PATH;
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
            console.log(uploadPath);
          },
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a report',
    type: CreateReviewRequestDto,
  })
  @Post()
  async create(
    @UploadedFiles()
    files: { report?: Express.Multer.File[]; result?: Express.Multer.File[] },
    @Body() createReviewRequestDto: CreateReviewRequestDto,
    @Req() req,
  ) {
    try {
      const creatorId = req.user.sub;
      const creatorRole = req.user.role;
      if (creatorRole === Role.ADMIN) {
        throw new UnauthorizedException(
          'Admin not authorized to create review request',
        );
      }
      const report = await this.reportService.saveReport(files, {
        additionalComments: createReviewRequestDto.additionalComments,
      });

      let request = await this.reviewRequestService.createReviewRequest(
        createReviewRequestDto.name,
        report.id,
        creatorId,
      );

      const config = await this.configService.getConfig(
        ConfigKeys.ASSIGNMENT_MODE,
      );

      if (config.value.toLowerCase() === 'manual') {
        // If Assignment Mode is Manual, then notify the Admin
        await this.notificationsService.notifyUser({
          receiverRole: Role.ADMIN,
          type: NotificationType.UNASSIGNED_REVIEW_REQUEST,
          entityId: request.id,
        });
      } else if (config.value.toLowerCase() === 'auto') {
        const radiologist = await this.reviewRequestService.allocateRadiologist(
          req.user.sub,
        );

        request = await this.reviewRequestService.assignReviewRequest(
          request.id,
          radiologist.id,
        );

        // If Assignment Mode is Auto, then notify the Radiologists
        await this.notificationsService.notifyUser({
          receiverRole: Role.RADIOLOGIST,
          receiverId: radiologist.id,
          type: NotificationType.REQUEST_ASSIGNED,
          entityId: request.id,
        });
      }

      return request;
    } catch (error) {
      handleError(error);
    }
  }

  @Get()
  @ApiQuery({ name: 'user_is', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findAll(@Query() query, @Req() req) {
    try {
      const radioligistId = req.user.sub;
      return await this.reviewRequestService.findAll(query, radioligistId);
    } catch (error) {
      handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reviewRequestService.findOne(id);
    } catch (error) {
      handleError(error);
    }
  }

  @Patch('assign/:id')
  async assignReview(
    @Param('id') id: string,
    @Body() updateReviewRequestDto: UpdateReviewRequestDto,
  ) {
    try {
      const request = await this.reviewRequestService.assignReviewRequest(
        id,
        updateReviewRequestDto.reviewerId,
      );

      // Notify the Radiologist that the request has been assigned to them
      await this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: updateReviewRequestDto.reviewerId,
        type: NotificationType.REQUEST_ASSIGNED,
        entityId: request.id,
      });

      return request;
    } catch (error) {
      handleError(error);
    }
  }

  @Patch('approve/:id')
  async update(@Param('id') id: string, @Body() approveReqDto: ApproveReqDto, @Req() req
) {
    try {
      const userId = req.user.sub;
      let request = await this.reviewRequestService.findOne(id)
      if (request.reviewerId !== userId) {
        throw new UnauthorizedException("Not Authorized")
      }
      
      request = await this.reviewRequestService.approveReviewRequest(
        id,
        approveReqDto.status,
      );

      // Notify the Radiologist that the request has been approved
      await this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: request.creatorId,
        type: NotificationType.REQUEST_APPROVED,
        entityId: request.id,
      });

      return request;
    } catch (error) {
      handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.reviewRequestService.remove(id);
    } catch (error) {
      handleError(error);
    }
  }
}
