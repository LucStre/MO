import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { spremljeno, Prisma } from '@prisma/client';

@Injectable()
export class SavedService {
  constructor(private prisma: PrismaService) {}

  async saved(
    spremljenoWhereUniqueInput: Prisma.spremljenoWhereUniqueInput,
  ): Promise<spremljeno | null> {
    return this.prisma.spremljeno.findUnique({
      where: spremljenoWhereUniqueInput,
    });
  }

  async savedAds(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.spremljenoWhereUniqueInput;
    where?: Prisma.spremljenoWhereInput;
    orderBy?: Prisma.spremljenoOrderByWithRelationInput;
  }): Promise<spremljeno[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.spremljeno.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSaved(data: Prisma.spremljenoCreateInput): Promise<spremljeno> {
    return this.prisma.spremljeno.create({
      data,
    });
  }

  async updateSaved(params: {
    where: Prisma.spremljenoWhereUniqueInput;
    data: Prisma.spremljenoUpdateInput;
  }): Promise<spremljeno> {
    const { where, data } = params;
    return this.prisma.spremljeno.update({
      data,
      where,
    });
  }

  async deleteSaved(
    where: Prisma.spremljenoWhereUniqueInput,
  ): Promise<spremljeno> {
    return this.prisma.spremljeno.delete({
      where,
    });
  }
}
