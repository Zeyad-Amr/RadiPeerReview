import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Report } from '@prisma/client';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportRepo extends PrismaGenericRepo<
  Prisma.ReportCreateInput,
  Report,
  Prisma.ReportInclude
> {
  constructor(private prismaService: PrismaService) {
    super('report', prismaService, {
      ReviewRequest: true
    });
  }

  
  async create(item: Prisma.ReportCreateInput){
    try {
      const res = await this.prismaService.report.create({
        data: item as any,
        include: this.includesObj,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}
