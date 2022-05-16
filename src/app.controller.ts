import { Controller, Get, Render } from '@nestjs/common';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Render('index.ejs')
  root() {
    const categories = this.userService.users({});

    return {
      message: 'Hello world!',
    };
  }
}
