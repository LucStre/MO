import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { StatusModule } from 'src/status/status.module';
import { WebController } from './web.controller';

@Module({
  controllers: [WebController],
  imports: [CategoryModule, StatusModule],
})
export class WebModule {}
