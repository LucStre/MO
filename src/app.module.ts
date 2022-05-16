import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UsersController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserService } from './user/user.service';
import { WebModule } from './web/web.module';

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UserService, PrismaService],
  imports: [UserModule, CategoryModule, WebModule],
})
export class AppModule {}
