import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PictureController],
  providers: [PictureService, PrismaService],
  exports: [PictureService],
})
export class PictureModule {}
