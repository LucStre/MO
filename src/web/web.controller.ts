import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { kategorija, Prisma } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';
import { StatusService } from 'src/status/status.service';

@Controller()
export class WebController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly statusService: StatusService,
  ) {}

  @Get()
  @Render('index.ejs')
  async home() {
    const categories = await this.categoryService.categories({});
    const map = categories.reduce((acc, curr, index) => {
      curr['podkategorije'] = [];
      acc[curr.id] = index;
      return acc;
    }, {});

    const roots = [];
    categories.forEach((curr) => {
      if (!curr.nadkategorija_id) {
        roots.push(curr);
        return;
      }

      categories[map[curr.nadkategorija_id]]['podkategorije'].push(curr);
    });

    return {
      message: 'Hello world!',
      categories: roots,
    };
  }

  @Get('/status')
  @Render('statuses.ejs')
  async statuses() {
    const statuses = await this.statusService.statuses({});

    return {
      statuses,
    };
  }

  @Post('/status')
  @Redirect()
  async createStatus(@Body() statusData: Prisma.statusUncheckedCreateInput) {
    const { id, naziv } = statusData;
    if (id) {
      await this.statusService.updateStatus({
        where: { id: Number(id) },
        data: { naziv },
      });
    } else {
      await this.statusService.createStatus({ naziv });
    }

    return { url: '/status' };
  }

  @Get('/status/new')
  @Render('new-status.ejs')
  async newStatus() {
    return {};
  }

  @Get('/status/:id')
  @Render('edit-status.ejs')
  async status(@Param('id') id: string) {
    const status = await this.statusService.status({ id: Number(id) });

    return status;
  }
}
