import { Test, TestingModule } from '@nestjs/testing';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { PrismaService } from '../prisma.service';

describe('AdController', () => {
  let adController: AdController;
  let adService: AdService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdController],
      providers: [AdService, PrismaService],
    }).compile();

    adService = await app.resolve(AdService);
    adController = await app.resolve(AdController);
  });

  describe('ad', () => {
    it('should return ad with id 1', () => {
      const result = adService.ad({ id: 1 });
      expect(adController.getAdById('1')).toStrictEqual(result);
    });
  });
});
