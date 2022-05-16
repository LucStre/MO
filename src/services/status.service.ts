import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { status, Prisma } from '@prisma/client';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async status(
    statusWhereUniqueInput: Prisma.statusWhereUniqueInput,
  ): Promise<status | null> {
    return this.prisma.status.findUnique({
      where: statusWhereUniqueInput,
    });
  }

  async statuses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.statusWhereUniqueInput;
    where?: Prisma.statusWhereInput;
    orderBy?: Prisma.statusOrderByWithRelationInput;
  }): Promise<status[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.status.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createStatus(data: Prisma.statusCreateInput): Promise<status> {
    return this.prisma.status.create({
      data,
    });
  }

  async updateStatus(params: {
    where: Prisma.statusWhereUniqueInput;
    data: Prisma.statusUpdateInput;
  }): Promise<status> {
    const { where, data } = params;
    return this.prisma.status.update({
      data,
      where,
    });
  }

  async deleteStatus(where: Prisma.statusWhereUniqueInput): Promise<status> {
    return this.prisma.status.delete({
      where,
    });
    //obrisati oglas
  }
}
