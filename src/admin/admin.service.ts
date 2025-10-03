import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity.ts/admin.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
  ) {}

  async createAdmin(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const admin = this.adminRepo.create({ email, password: hashed });
    return this.adminRepo.save(admin);
  }

  async findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }
}
