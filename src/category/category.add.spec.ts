import { CategoryService } from './category.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});

describe('create new category - unit', () => {
  it('creates new category correctly', async () => {
    let categoryService: CategoryService;
    const kratica = 'KAT';

    await categoryService.createCategory({
      ime: 'Kategorija',
      kratica: kratica,
      nadkategorija_id: 0,
    });

    const [savedCategory] = await prisma.kategorija.findMany({
      where: { kratica: kratica },
      take: 1,
    });

    expect(savedCategory.kratica).toBe(kratica);
  });

  it('fails if tries to create category with the same kratica twice', async () => {
    let categoryService: CategoryService;
    const kratica = 'KAT';
    const ime = 'Nova kategorija';
    const nadkategorija_id = 1;
    await categoryService.createCategory({
      ime: ime,
      kratica: kratica,
      nadkategorija_id: 0,
    });

    const [savedCategory] = await prisma.kategorija.findMany({
      where: { kratica },
      take: 1,
    });

    expect(savedCategory.kratica).toBe(kratica);

    await expect(() =>
      categoryService.createCategory({ ime, kratica, nadkategorija_id }),
    ).rejects.toThrow(
      'Unique constraint failed on the constraint: `kratica_unique`',
    );
  });
});
