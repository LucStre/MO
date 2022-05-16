import { Controller, Get, Render } from '@nestjs/common';
import { kategorija } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';

@Controller()
export class WebController {
  constructor(private readonly categoryService: CategoryService) {}

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

    console.log(roots);

    return {
      message: 'Hello world!',
      categories: roots,
    };
  }
}
