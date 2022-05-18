import { Module } from '@nestjs/common';
import { AdModule } from 'src/ad/ad.module';
import { CategoryModule } from 'src/category/category.module';
import { StatusModule } from 'src/status/status.module';
import { WebController } from './web.controller';

@Module({
  controllers: [WebController],
  imports: [AdModule, CategoryModule, StatusModule],
})
export class WebModule {}
