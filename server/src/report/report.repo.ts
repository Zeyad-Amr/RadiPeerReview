import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Report } from '@prisma/client';

@Injectable()
export class ReportRepo extends PrismaGenericRepo<
  Prisma.ReportCreateInput,
  Report,
  Prisma.ReportInclude
> {
  constructor(private prismaService: PrismaService) {
    super('report', prismaService, {});
  }
}
