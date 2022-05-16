import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { adresa, Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async address(
    adresaWhereUniqueInput: Prisma.adresaWhereUniqueInput,
  ): Promise<adresa | null> {
    return this.prisma.adresa.findUnique({
      where: adresaWhereUniqueInput,
    });
  }

  async addresss(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.adresaWhereUniqueInput;
    where?: Prisma.adresaWhereInput;
    orderBy?: Prisma.adresaOrderByWithRelationInput;
  }): Promise<adresa[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.adresa.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAddress(data: Prisma.adresaCreateInput): Promise<adresa> {
    return this.prisma.adresa.create({
      data,
    });
  }

  async updateAddress(params: {
    where: Prisma.adresaWhereUniqueInput;
    data: Prisma.adresaUpdateInput;
  }): Promise<adresa> {
    const { where, data } = params;
    return this.prisma.adresa.update({
      data,
      where,
    });
  }

  async deleteAddress(where: Prisma.adresaWhereUniqueInput): Promise<adresa> {
    return this.prisma.adresa.delete({
      where,
    });
    //obrisati oglase
  }
}
