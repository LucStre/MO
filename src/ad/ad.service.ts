import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { oglas, Prisma } from '@prisma/client';

@Injectable()
export class AdService {
  constructor(private prisma: PrismaService) {}

  async ad(
    oglasWhereUniqueInput: Prisma.oglasWhereUniqueInput,
  ): Promise<oglas | null> {
    return this.prisma.oglas.findUnique({
      where: oglasWhereUniqueInput,
    });
  }

  async ads(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.oglasWhereUniqueInput;
    where?: Prisma.oglasWhereInput;
    orderBy?: Prisma.oglasOrderByWithRelationInput;
  }): Promise<oglas[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.oglas.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAd(data: Prisma.oglasUncheckedCreateInput): Promise<oglas> {
    return this.prisma.oglas.create({
      data,
    });
  }

  async updateAd(params: {
    where: Prisma.oglasWhereUniqueInput;
    data: Prisma.oglasUncheckedUpdateInput;
  }): Promise<oglas> {
    const { where, data } = params;
    return this.prisma.oglas.update({
      data,
      where,
    });
  }

  async deleteAd(where: Prisma.oglasWhereUniqueInput): Promise<oglas> {
    return this.prisma.oglas.delete({
      where,
    });
    //obrisati kupovine, slike, spremljeno
  }
}
