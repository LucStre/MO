import { Test, TestingModule } from '@nestjs/testing';
import { AdService } from './ad/ad.service';
import { CategoryService } from './category/category.service';
import { PrismaService } from './prisma.service';
import { StatusService } from './status/status.service';
import { WebController } from './web/web.controller';

describe('AppController', () => {
  let appController: WebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebController],
      providers: [CategoryService, PrismaService, StatusService, AdService],
    }).compile();

    appController = app.get<WebController>(WebController);
  });

  describe('root', () => {
    it('should return home page', () => {
      expect(appController.getHello()).toBe('Hello world!');
    });
  });
});
