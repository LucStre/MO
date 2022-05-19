import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { WebModule } from '../src/web/web.module';
import { INestApplication } from '@nestjs/common';

describe('Category end to end', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WebModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  describe('Creating new status POST /api/status', () => {
    it(`should create new status`, () => {
      return request(app.getHttpServer())
        .post('/api/status')
        .send({
          naziv: 'test status',
        })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
