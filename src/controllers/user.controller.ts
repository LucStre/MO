import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { korisnik as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Post('user')
  async createUser(
    @Body()
    userData: {
      ime: string;
      prezime: string;
      brojtelefona: string;
      email: string;
    },
  ): Promise<UserModel> {
    const { ime, prezime, brojtelefona, email } = userData;
    return this.userService.createUser({
      ime,
      prezime,
      brojtelefona,
      email,
    });
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userData: {
      ime?: string;
      prezime?: string;
      brojtelefona?: string;
      email?: string;
    },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: {
        ime: userData.ime,
        prezime: userData.prezime,
        brojtelefona: userData.brojtelefona,
        email: userData.email,
      },
    });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
