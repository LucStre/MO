import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdService } from './ad.service';
import { oglas as AdModel } from '@prisma/client';

@Controller('api/ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Get(':id')
  async getAdById(@Param('id') id: string): Promise<AdModel> {
    return this.adService.ad({ id: Number(id) });
  }

  @Get()
  async getCategories(): Promise<AdModel[]> {
    return this.adService.ads({});
  }

  @Post()
  async createAd(
    @Body()
    adData: {
      naziv: string;
      opis: string;
      cijena: number;
      dostava: boolean;
      idkategorija: number;
      idadresa: number;
      idkorisnik: number;
      idstatus: number;
    },
  ): Promise<AdModel> {
    const {
      naziv,
      opis,
      cijena,
      dostava,
      idkategorija,
      idadresa,
      idkorisnik,
      idstatus,
    } = adData;
    return this.adService.createAd({
      naziv,
      opis,
      cijena,
      dostava,
      idkategorija,
      idadresa,
      idkorisnik,
      idstatus,
    });
  }

  @Put(':id')
  async updateAd(
    @Param('id') id: string,
    @Body()
    adData: {
      naziv?: string;
      opis?: string;
      cijena?: number;
      dostava?: boolean;
      idkategorija?: number;
      idadresa?: number;
      idkorisnik?: number;
      idstatus?: number;
    },
  ): Promise<AdModel> {
    return this.adService.updateAd({
      where: { id: Number(id) },
      data: {
        naziv: adData.naziv,
        opis: adData.opis,
        cijena: adData.cijena,
        dostava: adData.dostava,
        idkategorija: adData.idkategorija,
        idadresa: adData.idadresa,
        idkorisnik: adData.idkorisnik,
        idstatus: adData.idstatus,
      },
    });
  }

  @Delete(':id')
  async deleteAd(@Param('id') id: string): Promise<AdModel> {
    return this.adService.deleteAd({ id: Number(id) });
    //obriši Slika, spremljeno?
  }
}
