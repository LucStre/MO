import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryService = await app.resolve(CategoryService);
    categoryController = await app.resolve(CategoryController);
  });

  describe('categories', () => {
    it('should return all categories', () => {
      const result = categoryService.categories({});
      expect(categoryController.getCategories()).toStrictEqual(result);
    });
  });
});
