import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { slika as PictureModel } from '@prisma/client';
import { PictureService } from './picture.service';

@Controller('api/picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get(':id')
  async getPictureById(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.picture({ id: Number(id) });
  }

  @Get()
  async getPictures(): Promise<PictureModel[]> {
    return this.pictureService.pictures({});
  }

  @Post()
  async createPicture(
    @Body()
    pictureData: {
      vrijednost: string;
      naziv: string;
      idoglas: number;
    },
  ): Promise<PictureModel> {
    const { vrijednost, naziv, idoglas } = pictureData;
    return this.pictureService.createPicture({
      vrijednost,
      naziv,
      idoglas,
    });
  }

  @Put(':id')
  async updatePicture(
    @Param('id') id: string,
    @Body()
    pictureData: {
      vrijednost?: string;
      naziv?: string;
    },
  ): Promise<PictureModel> {
    return this.pictureService.updatePicture({
      where: { id: Number(id) },
      data: {
        vrijednost: pictureData.vrijednost,
        naziv: pictureData.naziv,
      },
    });
  }

  @Delete(':id')
  async deletePicture(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.deletePicture({ id: Number(id) });
  }
}
