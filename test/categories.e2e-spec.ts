import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CategoryModule } from '../src/category/category.module';
import { CategoryService } from '../src/category/category.service';
import { INestApplication } from '@nestjs/common';

describe('Category end to end', () => {
  let app: INestApplication;
  const categoryService = { categories: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CategoryModule],
    })
      .overrideProvider(CategoryService)
      .useValue(categoryService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET categories`, () => {
    return request(app.getHttpServer())
      .get('/api/categories')
      .expect(200)
      .expect(categoryService.categories());
  });

  afterAll(async () => {
    await app.close();
  });
});
