import { Test, TestingModule } from '@nestjs/testing';
import { AdService } from '../ad/ad.service';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '../prisma.service';
import { StatusService } from '../status/status.service';
import { WebController } from './web.controller';

describe('WebController', () => {
  let webController: WebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebController],
      providers: [CategoryService, PrismaService, StatusService, AdService],
    }).compile();

    webController = app.get<WebController>(WebController);
  });

  describe('root', () => {
    it('should return home page', async () => {
      expect(await webController.home()).toEqual(
        expect.objectContaining({
          message: 'Hello world!',
          categories: expect.anything(),
        }),
      );
    });

    it('should return statuses page', async () => {
      expect(await webController.statuses()).toEqual(
        expect.objectContaining({
          statuses: expect.anything(),
        }),
      );
    });
  });
});
