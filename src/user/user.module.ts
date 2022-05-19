import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
