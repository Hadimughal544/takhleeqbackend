import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { Details } from './details.entity/details.entity';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get()
  findAll(): Promise<Details[]> {
    return this.detailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detailsService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Details>) {
    return this.detailsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Details>) {
    return this.detailsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detailsService.remove(id);
  }
}
