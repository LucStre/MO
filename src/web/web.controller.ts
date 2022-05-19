import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AdService } from '../ad/ad.service';
import { CategoryService } from '../category/category.service';
import { StatusService } from '../status/status.service';

@Controller()
export class WebController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly statusService: StatusService,
    private readonly adService: AdService,
  ) {}

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

    return {
      message: 'Hello world!',
      categories: roots,
    };
  }

  @Get('/status')
  @Render('statuses.ejs')
  async statuses() {
    const statuses = await this.statusService.statuses({});

    return {
      statuses,
    };
  }

  @Post('/status')
  @Redirect()
  async createStatus(@Body() statusData: Prisma.statusUncheckedCreateInput) {
    const { id, naziv } = statusData;
    if (id) {
      await this.statusService.updateStatus({
        where: { id: Number(id) },
        data: { naziv },
      });
    } else {
      await this.statusService.createStatus({ naziv });
    }

    return { url: '/status' };
  }

  @Get('/status/new')
  @Render('new-status.ejs')
  async newStatus() {
    return {};
  }

  @Get('/status/:id')
  @Render('edit-status.ejs')
  async status(@Param('id') id: string) {
    const status = await this.statusService.status({ id: Number(id) });

    return status;
  }

  @Post('/category')
  @Redirect()
  async createCategory(
    @Body() kategorijaData: Prisma.kategorijaUncheckedCreateInput,
  ) {
    let { kratica } = kategorijaData;
    const { id, ime, nadkategorija_id } = kategorijaData;

    if (id) {
      await this.categoryService.updateCategory({
        where: { id: Number(id) },
        data: { ime, kratica, nadkategorija_id: Number(nadkategorija_id) },
      });
    } else {
      ({ kratica } = await this.categoryService.createCategory({
        ime,
        kratica,
        nadkategorija_id: Number(nadkategorija_id),
      }));
    }

    return { url: `/category/${kratica}` };
  }

  @Get('/category/new')
  @Render('new-category.ejs')
  async newCategory() {
    const categories = await this.categoryService.categories({});

    return {
      categories,
    };
  }

  @Get('/category/:kratica')
  @Render('edit-category.ejs')
  async editCategory(@Param('kratica') kratica: string) {
    const category = await this.categoryService.category(
      { kratica },
      { other_kategorija: true },
    );
    const categories = await this.categoryService.categories({
      where: { NOT: { id: category.id } },
    });

    const ads = await this.adService.ads({
      where: {
        OR: [category, ...category['other_kategorija']].map((cat) => ({
          idkategorija: cat.id,
        })),
      },
      include: { slika: true, status: true },
    });

    return {
      category,
      categories,
      ads,
    };
  }

  @Post('/ad')
  @Redirect()
  async createAd(@Body() oglasData: Prisma.oglasUncheckedCreateInput) {
    const { id, idkategorija, cijena, dostava, idstatus, ...rest } = oglasData;

    if (id) {
      await this.adService.updateAd({
        where: { id: Number(id) },
        data: {
          ...rest,
          idkategorija: Number(idkategorija),
          cijena: Number(cijena),
          dostava: (dostava as unknown as string) === '1',
          idstatus: Number(idstatus),
        },
      });
    } else {
      await this.adService.createAd({
        ...rest,
        idkategorija: Number(idkategorija),
        cijena: Number(cijena),
        dostava: (dostava as unknown as string) === '1',
        idstatus: Number(idstatus),
        idadresa: 1,
        idkorisnik: 1,
      });
    }

    const category = await this.categoryService.category({
      id: Number(idkategorija),
    });

    return { url: `/category/${category.kratica}/` };
  }

  @Get('/category/:kratica/new')
  @Render('new-ad.ejs')
  async newAd(@Param('kratica') kratica: string) {
    const category = await this.categoryService.category({ kratica });
    const statuses = await this.statusService.statuses({});

    return {
      category,
      statuses,
    };
  }

  @Get('/category/:kratica/:id')
  @Render('edit-ad.ejs')
  async editAd(@Param('kratica') kratica: string, @Param('id') id: string) {
    const category = await this.categoryService.category({ kratica });
    const ad = await this.adService.ad({ id: Number(id) }, { status: true });
    const statuses = await this.statusService.statuses({});

    return {
      ad,
      category,
      statuses,
    };
  }
}
