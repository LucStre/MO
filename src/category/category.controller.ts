import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { kategorija as CategoryModel } from '@prisma/client';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.category({ id: Number(id) });
  }

  @Get()
  async getCategories(): Promise<CategoryModel[]> {
    return this.categoryService.categories({});
  }

  @Post()
  async createCategory(
    @Body()
    categoryData: {
      ime: string;
      kratica: string;
      nadkategorija_id: number;
    },
  ): Promise<CategoryModel> {
    const { ime, kratica, nadkategorija_id } = categoryData;
    return this.categoryService.createCategory({
      ime,
      kratica,
      nadkategorija_id,
    });
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body()
    categoryData: {
      ime?: string;
      kratica?: string;
      nadkategorija_id?: number;
    },
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory({
      where: { id: Number(id) },
      data: {
        ime: categoryData.ime,
        kratica: categoryData.kratica,
        nadkategorija_id: categoryData.nadkategorija_id,
      },
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.deleteCategory({ id: Number(id) });
  }
}
