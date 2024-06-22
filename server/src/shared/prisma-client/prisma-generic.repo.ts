import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaGenericRepo<N, T, I = any> {
  constructor(
    private modelName: string,
    private prisma: PrismaService,
    protected includesObj?: I,
  ) {
    this.modelName = modelName;
    this.includesObj = includesObj;
  }

  async getAll(args?: any) {
    try {
      const res = await this.prisma[this.modelName].findMany(
        args ?? { include: this.includesObj },
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: any): Promise<T | null> {
    try {
      const res = await this.prisma[this.modelName].findUniqueOrThrow({
        where: { id },
        include: this.includesObj,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async create(item: N): Promise<T> {
    try {
      const res = await this.prisma[this.modelName].create({
        data: item as any,
        include: this.includesObj,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, item: Partial<N>): Promise<T | null> {
    try {
      const res = await this.prisma[this.modelName].update({
        where: { id },
        data: { ...item },
        include: this.includesObj,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prisma[this.modelName].delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
