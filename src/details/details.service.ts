import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Details } from './details.entity/details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Details)
    private detailsRepo: Repository<Details>,
  ) {}

  async findAll() {
    return await this.detailsRepo.find();
  }

  async findOne(id: number) {
    return await this.detailsRepo.findOneBy({ id });
  }

  async create(data: Partial<Details>) {
    const detail = this.detailsRepo.create(data);
    return await this.detailsRepo.save(detail);
  }

  async update(id: number, data: Partial<Details>) {
    await this.detailsRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.detailsRepo.delete(id);
  }
}
