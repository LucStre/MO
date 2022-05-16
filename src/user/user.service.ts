import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { korisnik, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    korisnikWhereUniqueInput: Prisma.korisnikWhereUniqueInput,
  ): Promise<korisnik | null> {
    return this.prisma.korisnik.findUnique({
      where: korisnikWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.korisnikWhereUniqueInput;
    where?: Prisma.korisnikWhereInput;
    orderBy?: Prisma.korisnikOrderByWithRelationInput;
  }): Promise<korisnik[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.korisnik.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.korisnikCreateInput): Promise<korisnik> {
    return this.prisma.korisnik.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.korisnikWhereUniqueInput;
    data: Prisma.korisnikUpdateInput;
  }): Promise<korisnik> {
    const { where, data } = params;
    return this.prisma.korisnik.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.korisnikWhereUniqueInput): Promise<korisnik> {
    return this.prisma.korisnik.delete({
      where,
    });
    //obrisati i sve adrese korisnika, njegov novčanik, sve kupovine, sve oglase, sve spremljene oglase
  }
}
