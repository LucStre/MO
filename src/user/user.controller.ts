import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { korisnik as UserModel } from '@prisma/client';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Post()
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

  @Put(':id')
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

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
