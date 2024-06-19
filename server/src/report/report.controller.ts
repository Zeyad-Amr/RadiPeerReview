import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  NotFoundException,
  Res,
  Response,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { handleError } from '@/shared/http-error';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
            const uploadPath = join(__dirname, '..', 'uploads');
            // Check if the directory exists
            if (!fs.existsSync(uploadPath)) {
              // If not, create it
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
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
    const filePath = join(__dirname, '..', 'uploads', filename);
    console.log(filename);
    console.log(filePath);

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
