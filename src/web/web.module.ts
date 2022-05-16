import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { WebController } from './web.controller';

@Module({
  controllers: [WebController],
  imports: [CategoryModule],
})
export class WebModule {}
