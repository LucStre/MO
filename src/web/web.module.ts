import { Module } from '@nestjs/common';
import { AdModule } from '../ad/ad.module';
import { CategoryModule } from '../category/category.module';
import { StatusModule } from '../status/status.module';
import { WebController } from './web.controller';

@Module({
  controllers: [WebController],
  imports: [AdModule, CategoryModule, StatusModule],
})
export class WebModule {}
