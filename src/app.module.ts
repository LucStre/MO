import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { AdModule } from './ad/ad.module';
import { CategoryModule } from './category/category.module';
import { PictureModule } from './picture/picture.module';
import { StatusModule } from './status/status.module';
import { WebModule } from './web/web.module';

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UserService, PrismaService],
  imports: [
    UserModule,
    AdModule,
    CategoryModule,
    PictureModule,
    StatusModule,
    WebModule,
  ],
})
export class AppModule {}
