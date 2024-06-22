import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Res,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, resolve } from 'path';
import * as fs from 'fs';
import { ReportService } from './report.service';

import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { handleError } from '@/shared/http-error'; // Adjust the path as needed
import { CreateReportDto } from './dto/create-report.dto';

const UPLOAD_PATH = resolve('src', 'shared', 'uploads');

@ApiTags('report')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
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
    type: CreateReportDto,
  })
  async uploadReport(
    @UploadedFiles()
    files: { report?: Express.Multer.File[]; result?: Express.Multer.File[] },
    @Body() body: CreateReportDto,
  ) {
    try {
      return await this.reportService.saveReport(files, body);
    } catch (error) {
      handleError(error);
    }
  }

  @Get('files/:filename')
  getFile(@Param('filename') filename: string, @Res() res: any) {
    const filePath = join(UPLOAD_PATH, filename);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      throw new NotFoundException('File not found');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.reportService.findAll();
    } catch (error) {
      handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reportService.findOne(id);
    } catch (error) {
      handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.reportService.remove(id);
    } catch (error) {
      handleError(error);
    }
  }
}
