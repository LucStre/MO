import { Module } from '@nestjs/common';
import { UsersController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserService } from './user/user.service';

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UserService, PrismaService],
  imports: [UserModule],
})
export class AppModule {}
