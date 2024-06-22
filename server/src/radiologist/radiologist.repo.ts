import { Prisma } from './../../node_modules/.prisma/client/index.d';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRadiologistDto } from './dto/create-radiologist.dto';
import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { Radiologist } from '@prisma/client';

@Injectable()
export class RadiologistRepo extends PrismaGenericRepo<
  Prisma.RadiologistCreateInput,
  Radiologist,
  Prisma.RadiologistInclude
> {
  constructor(private readonly prismaService: PrismaService) {
    super('radiologist', prismaService, {
      auth: true,
    });
  }

  async create(data: CreateRadiologistDto): Promise<any> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const radiologist = await tx.radiologist.create({
          data: {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            phone: data.phone,
            specializations: data.specializations,
          },
        });

        const user = await tx.auth.create({
          data: {
            username: data.username,
            password: data.password,
            role: 'RADIOLOGIST',
            radiologist: {
              connect: {
                id: radiologist.id,
              },
            },
          },
        });

        return { radiologist, user };
      });
    } catch (error) {
      throw error;
    }
  }

  async usernameExists(username: string): Promise<boolean> {
    return !!(await this.prismaService.auth.findUnique({
      where: {
        username,
      },
    }));
  }
}
