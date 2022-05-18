import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { status as StatusModel } from '@prisma/client';

@Controller('api/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get(':id')
  async getStatusById(@Param('id') id: string): Promise<StatusModel> {
    return this.statusService.status({ id: Number(id) });
  }

  @Get()
  async getStatuses(): Promise<StatusModel[]> {
    return this.statusService.statuses({});
  }

  @Post()
  async createStatus(
    @Body()
    statusData: {
      naziv: string;
    },
  ): Promise<StatusModel> {
    const { naziv } = statusData;
    return this.statusService.createStatus({
      naziv,
    });
  }

  @Put(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body()
    statusData: {
      naziv?: string;
    },
  ): Promise<StatusModel> {
    return this.statusService.updateStatus({
      where: { id: Number(id) },
      data: {
        naziv: statusData.naziv,
      },
    });
  }

  @Delete(':id')
  async deleteStatus(@Param('id') id: string): Promise<StatusModel> {
    return this.statusService.deleteStatus({ id: Number(id) });
  }
}
