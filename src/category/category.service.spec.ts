import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from './category.service';

const testKategorija1 = 'kategorija 1';
const testKratica1 = 'K1';
const nadkategorija_id = uuidv4();

const kategorijaArray = [
  { ime: testKategorija1, kratica: testKratica1, nadkategorija_id },
  { ime: 'Kategorija 2', kratica: 'K2', nadkategorija_id },
  { ime: 'Kategorija 3', kratica: 'K3', nadkategorija_id },
];

const oneKategorija = kategorijaArray[0];

const db = {
  kategorija: {
    findMany: jest.fn().mockResolvedValue(kategorijaArray),
    findUnique: jest.fn().mockResolvedValue(oneKategorija),
    findFirst: jest.fn().mockResolvedValue(oneKategorija),
    create: jest.fn().mockReturnValue(oneKategorija),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneKategorija),
    delete: jest.fn().mockResolvedValue(oneKategorija),
  },
};

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('category', () => {
    it('should get a single kategorija', () => {
      expect(service.category({ id: 1 })).resolves.toEqual(oneKategorija);
    });
  });

  describe('categories', () => {
    it('should return an array of kategorija', () => {
      expect(service.categories()).resolves.toEqual(kategorijaArray);
    });
  });

  describe('createCategory', () => {
    it('should successfully insert a kategorija', () => {
      expect(
        service.createCategory({
          ime: testKategorija1,
          kratica: testKratica1,
        }),
      ).resolves.toEqual(oneKategorija);
    });
  });

  describe('updateCategory', () => {
    it('should successfully update a kategorija', async () => {
      const cat = await service.updateCategory({
        where: { id: 1 },
        data: {},
      });
      expect(cat).toEqual(oneKategorija);
    });
  });

  describe('deleteCategory', () => {
    it('should return {deleted: true}', () => {
      expect(service.deleteCategory({ id: 1 })).resolves.toEqual(oneKategorija);
    });
  });
});
