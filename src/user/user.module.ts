import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UsersController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
