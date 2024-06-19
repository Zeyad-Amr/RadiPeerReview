import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, ReviewRequest } from "@prisma/client";

@Injectable()
export class ReviewRequestRepo extends PrismaGenericRepo<Prisma.ReviewRequestCreateInput, ReviewRequest, Prisma.ReviewRequestInclude> {
    constructor(private prismaService: PrismaService) {
        super('reviewRequest', prismaService, {
            report:true,
            reviewer:true,
            creator:true
        })
    }

}