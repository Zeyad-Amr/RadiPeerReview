import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Auth } from '@prisma/client';

@Injectable()
export class AuthRepo extends PrismaGenericRepo<
  Prisma.AuthCreateInput,
  Auth,
  Prisma.AuthInclude
> {
  constructor(private prismaService: PrismaService) {
    super('auth', prismaService, {
      radiologist: true,
    });
  }

  async getByAuthname(username: string) {
    try {
      const auth = await this.prismaService.auth.findUnique({
        where: { username },
        include: this.includesObj,
      });
      return auth;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: string, hash: string) {
    try {
      return await this.prismaService.auth.update({
        where: { id },
        data: { password: hash },
      });
    } catch (error) {
      throw error;
    }
  }
}
