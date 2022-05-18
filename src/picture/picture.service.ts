import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { slika, Prisma } from '@prisma/client';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async picture(
    slikaWhereUniqueInput: Prisma.slikaWhereUniqueInput,
  ): Promise<slika | null> {
    return this.prisma.slika.findUnique({
      where: slikaWhereUniqueInput,
    });
  }

  async pictures(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.slikaWhereUniqueInput;
    where?: Prisma.slikaWhereInput;
    orderBy?: Prisma.slikaOrderByWithRelationInput;
  }): Promise<slika[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.slika.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPicture(data: Prisma.slikaUncheckedCreateInput): Promise<slika> {
    return this.prisma.slika.create({
      data,
    });
  }

  async updatePicture(params: {
    where: Prisma.slikaWhereUniqueInput;
    data: Prisma.slikaUncheckedUpdateInput;
  }): Promise<slika> {
    const { where, data } = params;
    return this.prisma.slika.update({
      data,
      where,
    });
  }

  async deletePicture(where: Prisma.slikaWhereUniqueInput): Promise<slika> {
    return this.prisma.slika.delete({
      where,
    });
  }
}
