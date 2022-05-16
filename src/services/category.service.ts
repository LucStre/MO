import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { kategorija, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async category(
    kategorijaWhereUniqueInput: Prisma.kategorijaWhereUniqueInput,
  ): Promise<kategorija | null> {
    return this.prisma.kategorija.findUnique({
      where: kategorijaWhereUniqueInput,
    });
  }

  async categorys(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.kategorijaWhereUniqueInput;
    where?: Prisma.kategorijaWhereInput;
    orderBy?: Prisma.kategorijaOrderByWithRelationInput;
  }): Promise<kategorija[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.kategorija.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCategory(
    data: Prisma.kategorijaCreateInput,
  ): Promise<kategorija> {
    return this.prisma.kategorija.create({
      data,
    });
  }

  async updateCategory(params: {
    where: Prisma.kategorijaWhereUniqueInput;
    data: Prisma.kategorijaUpdateInput;
  }): Promise<kategorija> {
    const { where, data } = params;
    return this.prisma.kategorija.update({
      data,
      where,
    });
  }

  async deleteCategory(
    where: Prisma.kategorijaWhereUniqueInput,
  ): Promise<kategorija> {
    return this.prisma.kategorija.delete({
      where,
    });
    //obrisati nadkategorija, oglas
  }
}
