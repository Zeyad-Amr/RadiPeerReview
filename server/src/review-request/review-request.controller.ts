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
} from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReportService } from '@/report/report.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { extname, resolve } from 'path';
import { diskStorage } from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { handleError } from '@/shared/http-error';

@Controller('review-request')
export class ReviewRequestController {
  constructor(
    private readonly reviewRequestService: ReviewRequestService,
    private reportService: ReportService,
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
            const uploadPath = resolve(__dirname, '..', 'uploads');
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
      const creatorId = req.user.radioligistId;
      const report = await this.reportService.saveReport(
        files,
        createReviewRequestDto,
      );
      return this.reviewRequestService.createReviewRequest(
        report.id,
        creatorId,
      );
    } catch (error) {
      handleError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.reviewRequestService.findAll();      
    } catch (error) {
      handleError(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
try {
  return await this.reviewRequestService.findOne(id);
} catch (error) {
  handleError(error)
}
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReviewRequestDto: UpdateReviewRequestDto,
  // ) {
  //   return this.reviewRequestService.update(id, updateReviewRequestDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.reviewRequestService.remove(id);
    } catch (error) {
      handleError(error)
    }
  }
}
