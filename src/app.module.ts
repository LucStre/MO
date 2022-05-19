import { Module } from '@nestjs/common';
import { AdModule } from './ad/ad.module';
import { CategoryModule } from './category/category.module';
import { PictureModule } from './picture/picture.module';
import { PrismaService } from './prisma.service';
import { StatusModule } from './status/status.module';
import { UsersController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { WebModule } from './web/web.module';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService],
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
